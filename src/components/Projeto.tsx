"use client";

import { useEffect, useRef, useState } from "react";
import { PLANTA_ALTURA, PLANTA_LARGURA, pavimentos, terreno } from "@/content/plantas";

// Plantas do projeto da ARL, vetorizadas a partir da apresentação de agosto de 2026
// e alinhadas entre si (escala uniforme, sem deformar). O terreno é desenhado uma vez,
// em traço claro; cada pavimento se desenha por cima ao ser escolhido.

const INICIAL = "terreo";

export function Projeto() {
  const [slug, setSlug] = useState(INICIAL);
  const [visto, setVisto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  // Espessura do traço em pixels reais (1px), convertida para as unidades da planta.
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const ajustar = () => {
      const largura = el.getBoundingClientRect().width;
      if (largura) el.style.setProperty("--k", (PLANTA_LARGURA / largura).toFixed(3));
    };
    ajustar();
    const ro = new ResizeObserver(ajustar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // O desenho começa quando a planta entra na tela.
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const atual = pavimentos.find((p) => p.slug === slug) ?? pavimentos[0];
  const ordem = ["subsolo-2", "subsolo-1", "terreo", "primeiro"];
  const lista = ordem.map((s) => pavimentos.find((p) => p.slug === s)!).reverse();

  return (
    <section id="projeto" className="projeto" aria-labelledby="projeto-titulo">
      <div className="projeto-topo">
        <h2 id="projeto-titulo" className="secao-titulo">
          O projeto
        </h2>
        <p className="projeto-texto">
          Dois subsolos, térreo e primeiro pavimento, com estacionamento dentro do terreno.
          Escolha um pavimento para ver a planta.
        </p>
      </div>

      <div className="projeto-corpo">
        <ul className="projeto-pavimentos" aria-label="Pavimentos">
          {lista.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                aria-pressed={p.slug === slug}
                onClick={() => setSlug(p.slug)}
              >
                {p.nome}
              </button>
            </li>
          ))}
        </ul>

        <div ref={caixa} className="projeto-planta" data-visto={visto}>
          <svg
            viewBox={`0 0 ${PLANTA_LARGURA} ${PLANTA_ALTURA}`}
            role="img"
            aria-label={`Planta do ${atual.nome} do Pátio Boa Vista`}
          >
            <g className="planta-terreno">
              {terreno.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  pathLength={1}
                  style={{ ["--d" as string]: `${Math.round(Math.min(i * 2.4, 1400))}ms` }}
                />
              ))}
            </g>
            <g className="planta-pavimento" key={atual.slug}>
              {atual.tracos.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  pathLength={1}
                  style={{ ["--d" as string]: `${Math.round(Math.min(i * 3, 1800))}ms` }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      <p className="projeto-credito">
        Plantas: ARL, apresentação de agosto de 2026. Redesenhadas a partir do original,
        sem escala; sujeitas a alterações durante a obra.
      </p>
    </section>
  );
}
