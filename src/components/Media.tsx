"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Loja, Midia } from "@/content/lojas";
import { Plate } from "./Plate";

type Props = {
  midia?: Midia;
  loja: Loja;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// Foto, vídeo ou, sem mídia cadastrada, a prancha da marca.
export function Media({ midia, loja, sizes, priority, className = "", style }: Props) {
  if (!midia) {
    return (
      <div className={`midia ${className}`} style={style}>
        <Plate loja={loja} />
      </div>
    );
  }

  if (midia.tipo === "video") {
    return (
      <div className={`midia ${className}`} style={style}>
        <Video src={midia.src} poster={midia.poster} alt={midia.alt} />
      </div>
    );
  }

  return (
    <div className={`midia ${className}`} style={style}>
      <Image
        src={midia.src}
        alt={midia.alt}
        width={midia.largura}
        height={midia.altura}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

// Vídeo mudo em loop que só toca quando está na tela
// e fica parado no pôster para quem pediu menos movimento.
function Video({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  );
}
