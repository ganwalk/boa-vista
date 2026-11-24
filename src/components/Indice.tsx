"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import type { Loja } from "@/content/lojas";
import { Media } from "./Media";

// Lista tipográfica das lojas. A foto da loja em destaque ocupa o fundo da seção
// e o texto passa para creme sobre ela.
// Com mouse, o destaque segue o hover; sem mouse, segue a rolagem:
// a loja cuja linha está no meio da tela é a que aparece no fundo.

export function Indice({ lojas }: { lojas: Loja[] }) {
  const [atual, setAtual] = useState<number | null>(null);
  const secao = useRef<HTMLElement>(null);
  const linhas = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const semHover = window.matchMedia("(hover: none), (pointer: coarse)");
    let raf = 0;
    const medir = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!semHover.matches || !secao.current) return;
        const meio = window.innerHeight / 2;
        const r = secao.current.getBoundingClientRect();
        if (r.top > meio || r.bottom < meio) return setAtual(null);
        let melhor: number | null = null;
        let dist = Infinity;
        linhas.current.forEach((li, i) => {
          if (!li) return;
          const b = li.getBoundingClientRect();
          const d = Math.abs(b.top + b.height / 2 - meio);
          if (d < dist) {
            dist = d;
            melhor = i;
          }
        });
        setAtual(melhor);
      });
    };
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", medir);
    };
  }, []);

  return (
    <section
      ref={secao}
      id="lojas"
      className="indice"
      data-ativo={atual !== null}
      aria-labelledby="indice-titulo"
    >
      <div className="indice-fundo" aria-hidden="true">
        <div className="indice-palco">
        {lojas.map((loja, i) => (
          <Media
            key={loja.slug}
            midia={loja.capa}
            loja={loja}
            sizes="100vw"
            className="indice-foto"
            style={{ opacity: atual === i ? 1 : 0 }}
          />
        ))}
        <div className="indice-veu" />
        </div>
      </div>

      <div className="indice-conteudo">
        <h2 id="indice-titulo" className="secao-titulo">
          Todas as lojas
        </h2>
        <ul className="indice-lista" onMouseLeave={() => setAtual(null)}>
          {lojas.map((loja, i) => (
            <li
              key={loja.slug}
              ref={(el) => {
                linhas.current[i] = el;
              }}
              data-atual={atual === i}
            >
              <Link
                href={`/lojas/${loja.slug}`}
                className="indice-item"
                onMouseEnter={() => setAtual(i)}
                onFocus={() => setAtual(i)}
              >
                <span className="indice-nome">{loja.nome}</span>
                <span className="indice-cat">{loja.categoria}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
