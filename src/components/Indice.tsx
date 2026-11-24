"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import type { Loja } from "@/content/lojas";
import { Media } from "./Media";

// Lista tipográfica das lojas. Com mouse, a imagem da loja acompanha o cursor.

export function Indice({ lojas }: { lojas: Loja[] }) {
  const [atual, setAtual] = useState<number | null>(null);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fino.matches) return;

    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const seguir = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (reduz.matches) { x = tx; y = ty; }
      if (!raf) raf = requestAnimationFrame(passo);
    };
    const passo = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(passo) : 0;
    };
    window.addEventListener("pointermove", seguir, { passive: true });
    return () => {
      window.removeEventListener("pointermove", seguir);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="lojas" className="indice" aria-labelledby="indice-titulo">
      <h2 id="indice-titulo" className="secao-titulo">
        Todas as lojas
      </h2>
      <ul className="indice-lista" onMouseLeave={() => setAtual(null)}>
        {lojas.map((loja, i) => (
          <li key={loja.slug}>
            <Link
              href={`/lojas/${loja.slug}`}
              className="indice-item"
              onMouseEnter={() => setAtual(i)}
              onFocus={() => setAtual(null)}
            >
              <span className="indice-nome">{loja.nome}</span>
              <span className="indice-cat">{loja.categoria}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={caixa} className="cursor-midia" aria-hidden="true">
        {lojas.map((loja, i) => (
          <Media
            key={loja.slug}
            midia={loja.capa}
            loja={loja}
            sizes="320px"
            className="cursor-quadro"
            style={{ opacity: atual === i ? 1 : 0, clipPath: atual === i ? "inset(0)" : "inset(50% 0 50% 0)" }}
          />
        ))}
      </div>
    </section>
  );
}
