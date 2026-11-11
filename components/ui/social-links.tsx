"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Social {
  name: string;
  image: string;
  url?: string;
  onClick?: () => void;
}

export interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
  className?: string;
}

export function SocialLinks({
  socials,
  className,
  ...props
}: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState<number>(0);
  const [clicked, setClicked] = React.useState<boolean>(false);

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 200);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [clicked]);

  return (
    <div
      className={cn("flex items-center justify-center gap-0", className)}
      {...props}
    >
      {socials.map((social, index) => {
        const handleClick = (e: React.MouseEvent) => {
          setClicked(true);
          if (social.onClick) {
            social.onClick();
          } else if (social.url) {
            window.open(social.url, "_blank", "noopener,noreferrer");
          }
        };

        return (
          <div
            className={cn(
              "relative cursor-pointer px-4 sm:px-5 py-2 transition-opacity duration-200 select-none",
              hoveredSocial && hoveredSocial !== social.name
                ? "opacity-50"
                : "opacity-100",
            )}
            key={index}
            onMouseEnter={() => {
              setHoveredSocial(social.name);
              setRotation(Math.random() * 20 - 10);
            }}
            onMouseLeave={() => setHoveredSocial(null)}
            onClick={handleClick}
          >
            <span className="block text-base sm:text-lg font-medium">{social.name}</span>
            <AnimatePresence>
              {hoveredSocial === social.name && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center pointer-events-none"
                  animate={animation}
                >
                  <motion.img
                    key={social.name}
                    src={social.image}
                    alt={social.name}
                    className="size-14 sm:size-16 object-contain drop-shadow-md"
                    initial={{
                      y: -40,
                      rotate: rotation,
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                    animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default SocialLinks;
