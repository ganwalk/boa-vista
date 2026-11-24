"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef } from "react";
import type { Loja } from "@/content/lojas";
import { Media } from "./Media";

// Uma fileira de vitrines que anda para o lado conforme a página desce.
// No celular e para quem pediu menos movimento, vira rolagem horizontal comum.

export function Vitrines({ lojas }: { lojas: Loja[] }) {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = secao.current;
    const t = trilho.current;
    if (!s || !t) return;

    const mq = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    let raf = 0;

    const medir = () => {
      if (!mq.matches) {
        s.style.removeProperty("height");
        t.style.removeProperty("transform");
        return;
      }
      const sobra = t.scrollWidth - window.innerWidth;
      s.style.height = `${window.innerHeight + sobra}px`;
      mover();
    };

    const mover = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!mq.matches) return;
        const r = s.getBoundingClientRect();
        const sobra = t.scrollWidth - window.innerWidth;
        const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
        t.style.transform = `translate3d(${-p * sobra}px, 0, 0)`;
      });
    };

    medir();
    window.addEventListener("resize", medir);
    window.addEventListener("scroll", mover, { passive: true });
    mq.addEventListener("change", medir);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", medir);
      window.removeEventListener("scroll", mover);
      mq.removeEventListener("change", medir);
    };
  }, []);

  return (
    <section ref={secao} className="vitrines" aria-labelledby="vitrines-titulo">
      <div className="vitrines-palco">
        <h2 id="vitrines-titulo" className="vitrines-titulo">
          Vitrines
        </h2>
        <div ref={trilho} className="vitrines-trilho">
          {lojas.map((loja, i) => (
            <Link
              key={loja.slug}
              href={`/lojas/${loja.slug}`}
              className={`vitrine vitrine--${i % 3}`}
            >
              <Media
                midia={loja.capa}
                loja={loja}
                sizes="(min-width: 900px) 40vw, 80vw"
                className="vitrine-midia"
                style={{ viewTransitionName: `capa-${loja.slug}` }}
              />
              <span className="vitrine-legenda">
                <span className="vitrine-nome">{loja.nome}</span>
                <span className="vitrine-cat">{loja.categoria}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
