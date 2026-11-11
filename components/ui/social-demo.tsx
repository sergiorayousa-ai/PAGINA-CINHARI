import { SocialLinks } from "@/components/ui/social-links";

const socials = [
  {
    name: "Instagram",
    image:
      "https://cdn.21st.dev/assets/localized/6486882af723b976a81fed3662a2950cb06a250d8978efdb5e3f0ac3590b5fae.png",
  },
  {
    name: "Facebook",
    image:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
  },
  {
    name: "WhatsApp",
    image:
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg",
  },
];

export function SocialLinksDemo() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <SocialLinks socials={socials} />
    </main>
  );
}

export function SocialLinksCustomGap() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <SocialLinks socials={socials.slice(0, 2)} className="gap-4" />
    </main>
  );
}

export default SocialLinksDemo;
