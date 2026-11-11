import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, PhoneCall, CheckCircle2, Pause, Play, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface RippleBloomHeroProps {
  onDonateClick?: () => void;
  onSurveyClick: () => void;
  onResourcesClick: () => void;
  onCrisisClick: () => void;
}

export const RippleBloomHero: React.FC<RippleBloomHeroProps> = ({
  onSurveyClick,
  onResourcesClick,
  onCrisisClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    let animationFrameId: number;
    const mouse = [0.5, 0.5];
    const clicks: { x: number; y: number; t: number }[] = [];
    const MAX_CLICKS = 8;
    const t0 = performance.now();
    const getT = () => (performance.now() - t0) / 1000;

    const handleResize = () => {
      if (!container || !canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse[0] = (e.clientX - rect.left) / rect.width;
      mouse[1] = 1 - (e.clientY - rect.top) / rect.height;
    };

    const handleClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      clicks.push({
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
        t: getT()
      });
      if (clicks.length > MAX_CLICKS) clicks.shift();
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    const VS = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const FS = `
      precision highp float;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_time;
      uniform vec2  u_clicks[8];
      uniform float u_click_t[8];
      uniform float u_click_n;

      #define PI 3.14159265359

      // Calm Cinhari therapeutic palette
      vec3 pal(float t) {
        t = clamp(t, 0.0, 1.0);
        vec3 deep = vec3(0.04, 0.18, 0.22); // Deep relaxing ocean teal
        vec3 dark = vec3(0.08, 0.32, 0.38); // Medium marine teal
        vec3 mid  = vec3(0.13, 0.58, 0.57); // Vibrant cyan-teal
        vec3 warm = vec3(0.28, 0.76, 0.74); // Turquoise breath
        vec3 lite = vec3(0.68, 0.95, 0.93); // Soft luminous water
        if (t < 0.25) return mix(deep, dark, t * 4.0);
        if (t < 0.50) return mix(dark, mid,  (t - 0.25) * 4.0);
        if (t < 0.75) return mix(mid,  warm, (t - 0.50) * 4.0);
        return mix(warm, lite, (t - 0.75) * 4.0);
      }

      float hash21(vec2 p) {
        p = fract(p * vec2(127.1, 311.7));
        p += dot(p, p + 19.19);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i),           hash21(i + vec2(1,0)), f.x),
          mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = p * 2.03 + vec2(1.7, 9.2);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy / u_res) * vec2(u_res.x / u_res.y, 1.0);
        vec2 m  = u_mouse * vec2(u_res.x / u_res.y, 1.0);
        float ar = u_res.x / u_res.y;

        // Gentle breathing background field
        float bg = fbm(uv * 1.5 - u_time * 0.04)
                 + fbm(uv * 2.8 + vec2(4.1, 2.3) + u_time * 0.03) * 0.5;
        bg /= 1.5;

        // Smooth interactive ripples
        float md = length(uv - m);
        float ripple = sin(md * 24.0 - u_time * 3.5) * exp(-md * 4.2) * 0.4;
        float cursorGlow = exp(-md * md * 3.8) * 0.45;

        // Click ripples
        float shocks = 0.0;
        for (int i = 0; i < 8; i++) {
          float isActive = step(float(i) + 0.5, u_click_n);
          float age = u_time - u_click_t[i];
          vec2 cp = u_clicks[i] * vec2(ar, 1.0);
          float d = length(uv - cp);
          float r = age * 1.0;
          float ring = exp(-pow(d - r, 2.0) * 120.0) * exp(-age * 1.4) * 1.2;
          float ring2 = exp(-pow(d - r * 0.55, 2.0) * 180.0) * exp(-age * 2.2) * 0.6;
          shocks += (ring + ring2) * isActive;
        }

        float val = bg * 0.32 + ripple + cursorGlow + shocks;
        vec3 col = pal(clamp(val, 0.0, 1.0));
        
        // Gentle vignette darkening for text readability
        vec2 scrUV = gl_FragCoord.xy / u_res;
        float vig = smoothstep(1.3, 0.2, length(scrUV - 0.5));
        col = mix(vec3(0.03, 0.12, 0.16), col, vig * 0.95 + 0.05);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (src: string, type: number) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(VS, gl.VERTEX_SHADER);
    const fragShader = createShader(FS, gl.FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_pos');
    const resLoc = gl.getUniformLocation(program, 'u_res');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const clicksLoc = gl.getUniformLocation(program, 'u_clicks[0]');
    const clickTLoc = gl.getUniformLocation(program, 'u_click_t[0]');
    const clickNLoc = gl.getUniformLocation(program, 'u_click_n');

    const cPos = new Float32Array(MAX_CLICKS * 2);
    const cT = new Float32Array(MAX_CLICKS);

    const render = () => {
      if (!isPaused && gl && canvas) {
        const t = getT();
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.uniform2fv(mouseLoc, mouse);
        gl.uniform1f(timeLoc, t);
        gl.uniform1f(clickNLoc, clicks.length);

        cPos.fill(0);
        cT.fill(0);
        clicks.forEach((c, idx) => {
          cPos[idx * 2] = c.x;
          cPos[idx * 2 + 1] = c.y;
          cT[idx] = c.t;
        });
        gl.uniform2fv(clicksLoc, cPos);
        gl.uniform1fv(clickTLoc, cT);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, [isPaused]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-slate-900 text-white select-none cursor-default"
      aria-label="Presentación principal de Fundación Cinhari"
    >
      {/* Interactive WebGL Shader Canvas */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 opacity-90"
          aria-hidden="true"
        />
      )}

      {/* Decorative Light Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-teal-500/10 via-transparent to-black/40 pointer-events-none" />

      {/* Subtle Pause / Play Shader Button for Accessibility */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused(!isPaused);
          }}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-200 border border-white/20 text-xs flex items-center gap-1.5 backdrop-blur-md shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          title={isPaused ? 'Reanudar animación interactiva' : 'Pausar animación de fondo (Accesibilidad)'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-teal-300" /> : <Pause className="w-3.5 h-3.5 text-teal-300" />}
          <span className="hidden sm:inline">{isPaused ? 'Activar ondas' : 'Pausar ondas'}</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {/* Centered Logo & Emblem Showcase (Matching Reference Screenshot) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-6"
        >
          {/* Centered Large Official Cinhari Heart & Wings Emblem */}
          <div className="w-28 h-24 sm:w-36 sm:h-30 mb-4 relative drop-shadow-xl">
            <svg
              viewBox="0 0 360 250"
              className="w-full h-full drop-shadow-lg transition-transform duration-300 hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heroGradOuterCyanLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00c8f5" />
                  <stop offset="60%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#33ebff" />
                </linearGradient>

                <linearGradient id="heroGradOuterCyanRight" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00c8f5" />
                  <stop offset="60%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#33ebff" />
                </linearGradient>

                <linearGradient id="heroGradMidWingLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00b4e6" />
                  <stop offset="50%" stopColor="#00d5f8" />
                  <stop offset="100%" stopColor="#60edff" />
                </linearGradient>

                <linearGradient id="heroGradMidWingRight" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00b4e6" />
                  <stop offset="50%" stopColor="#00d5f8" />
                  <stop offset="100%" stopColor="#60edff" />
                </linearGradient>

                <linearGradient id="heroGradInnerPetalLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00779e" />
                  <stop offset="60%" stopColor="#00a3cc" />
                  <stop offset="100%" stopColor="#00c8eb" />
                </linearGradient>

                <linearGradient id="heroGradInnerPetalRight" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00779e" />
                  <stop offset="60%" stopColor="#00a3cc" />
                  <stop offset="100%" stopColor="#00c8eb" />
                </linearGradient>

                <linearGradient id="heroGradCenterHeart" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0a4d6e" />
                  <stop offset="50%" stopColor="#063852" />
                  <stop offset="100%" stopColor="#032537" />
                </linearGradient>
              </defs>

              {/* LAYER 1: Wide Bottom Horizontal Wing Lobes */}
              <path
                d="M180 180 C130 180 40 225 12 188 C-8 160 5 125 45 125 C85 125 135 150 180 180 Z"
                fill="url(#heroGradOuterCyanLeft)"
              />
              <path
                d="M180 180 C230 180 320 225 348 188 C368 160 355 125 315 125 C275 125 225 150 180 180 Z"
                fill="url(#heroGradOuterCyanRight)"
              />

              {/* LAYER 2: Middle Lateral Ascending Petals */}
              <path
                d="M180 180 C135 150 50 130 48 85 C46 50 82 40 115 58 C145 74 165 120 180 180 Z"
                fill="url(#heroGradMidWingLeft)"
              />
              <path
                d="M180 180 C225 150 310 130 312 85 C314 50 278 40 245 58 C215 74 195 120 180 180 Z"
                fill="url(#heroGradMidWingRight)"
              />

              {/* LAYER 3: Translucent Inner Flanking Petals */}
              <path
                d="M180 180 C150 145 82 110 82 68 C82 45 105 38 128 52 C152 68 168 115 180 180 Z"
                fill="url(#heroGradInnerPetalLeft)"
                opacity="0.92"
              />
              <path
                d="M180 180 C210 145 278 110 278 68 C278 45 255 38 232 52 C208 68 192 115 180 180 Z"
                fill="url(#heroGradInnerPetalRight)"
                opacity="0.92"
              />

              {/* LAYER 4: Prominent Dark Navy Top-Center Heart */}
              <path
                d="M180 180 C155 140 85 92 85 45 C85 18 112 5 140 18 C158 26 172 45 180 62 C188 45 202 26 220 18 C248 5 275 18 275 45 C275 92 205 140 180 180 Z"
                fill="url(#heroGradCenterHeart)"
              />

              {/* Central Heart Highlight subtle reflection curve */}
              <path
                d="M180 75 C186 58 198 42 214 34 C232 25 252 32 254 48 C256 82 202 128 180 160 C175 135 174 95 180 75 Z"
                fill="#0096c7"
                opacity="0.25"
              />
            </svg>
          </div>

          {/* Centered Main Title with Authentic Typography */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-normal text-white drop-shadow-md text-center"
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
          >
            Fundación CINHARI
          </h2>

          {/* Center Subtitle Pill */}
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-cyan-200 text-xs sm:text-sm font-medium tracking-wide">
            <span>Psicología Especializada - Bogotá - Soacha</span>
            <span className="text-white/40">·</span>
            <span>Calle 17 A # 13-24</span>
          </div>
        </motion.div>

        {/* Centered Mission Statement (Matching screenshot motto style) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-teal-50/95 max-w-3xl mx-auto font-light leading-relaxed drop-shadow text-center"
        >
          Trabajamos para brindar atención psicológica especializada, habilitación integral y bienestar emocional a niños, adolescentes y familias.
        </motion.p>

        {/* Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto"
        >
          <button
            type="button"
            id="hero-survey-cta"
            onClick={onSurveyClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-base shadow-lg shadow-teal-950/40 hover:shadow-teal-600/40 border border-white/20 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <Activity className="w-5 h-5 text-white" />
            <span>Test: ¿Cómo estoy psicológicamente?</span>
          </button>

          <button
            type="button"
            id="hero-resources-cta"
            onClick={onResourcesClick}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-100 hover:text-white font-medium text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>Recursos de Bienestar</span>
          </button>
        </motion.div>

        {/* Reassurance Micro-Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 pt-6 border-t border-white/15 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-teal-100/90"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>100% de confidencialidad médica</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Certificado fiscal de donaciones</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCrisisClick}
              className="text-amber-300 hover:text-amber-200 underline font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              ¿Necesitas ayuda urgente? Línea 24h
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
