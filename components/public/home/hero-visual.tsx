import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="relative h-[342px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
      <Image
        src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="(min-width: 1024px) 620px, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-teal-50/20 to-teal-950/30" />
    </div>
  );
}
