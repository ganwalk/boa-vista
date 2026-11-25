"use client";

import { useEffect, useRef } from "react";

// Desenho de linha da fachada, que se forma na abertura da página e depois
// se dissolve na perspectiva real do projeto (ver Hero.tsx).
// É uma leitura simplificada da fachada da ARL, não o desenho técnico.

const W = 1400;
const H = 640;
const M = 40; // margem lateral
const TOP = 64; // base da cornija
const BAND = 300; // faixa entre pavimentos
const SPRING = 420; // nascimento dos arcos
const FLOOR = 600; // soleira

export function Facade({ baias = 7 }: { baias?: number }) {
  const svg = useRef<SVGSVGElement>(null);

  // Espessura do traço em pixels reais, igual em todas as linhas e em qualquer tamanho de tela:
  // 1px no desktop e 0,8px no celular. Convertida para as unidades do desenho conforme a largura.
  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const ajustar = () => {
      const largura = el.getBoundingClientRect().width;
      if (!largura) return;
      const px = largura < 600 ? 0.8 : 1;
      el.style.setProperty("--traco", ((px * W) / largura).toFixed(3));
    };
    ajustar();
    const ro = new ResizeObserver(ajustar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const meio = Math.floor(baias / 2);
  const bw = (W - M * 2) / baias;

  let ordem = 0;
  const n = () => ({ style: { ["--i" as string]: ordem++ } });

  return (
    <svg
      ref={svg}
      className="facade"
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
    >

      {/* Cornija */}
      <g className="tracos">
        {/* Topo e base espelhados: uma linha que fecha as pilastras externas (x ± 9)
            e duas linhas escalonadas para fora, a 12 e 24 unidades. */}
        {[0, 1, 2].map((k) => (
          <line
            key={`t${k}`}
            pathLength={1}
            {...n()}
            x1={M - 9 - k * 11}
            y1={TOP - k * 12}
            x2={W - M + 9 + k * 11}
            y2={TOP - k * 12}
          />
        ))}
        {[0, 1, 2].map((k) => (
          <line
            key={`b${k}`}
            pathLength={1}
            {...n()}
            x1={M - 9 - k * 11}
            y1={FLOOR + k * 12}
            x2={W - M + 9 + k * 11}
            y2={FLOOR + k * 12}
          />
        ))}

        {/* Faixa entre os pavimentos, até a face externa das pilastras */}
        <line pathLength={1} {...n()} x1={M - 9} y1={BAND - 6} x2={W - M + 9} y2={BAND - 6} />
        <line pathLength={1} {...n()} x1={M - 9} y1={BAND + 6} x2={W - M + 9} y2={BAND + 6} />

        {/* Pilastras */}
        {Array.from({ length: baias + 1 }, (_, i) => {
          const x = M + i * bw;
          return (
            <g key={`p${i}`}>
              <line pathLength={1} {...n()} x1={x - 9} y1={TOP} x2={x - 9} y2={FLOOR} />
              <line pathLength={1} {...n()} x1={x + 9} y1={TOP} x2={x + 9} y2={FLOOR} />
            </g>
          );
        })}

        {/* Janelas do pavimento superior, em arco como as arcadas do térreo */}
        {Array.from({ length: baias }, (_, i) => {
          const cx = M + i * bw + bw / 2;
          const jr = (bw * 0.42) / 2;
          const topo = 104;
          const base = 248;
          const nasce = topo + jr;
          return (
            <g key={`j${i}`}>
              <path
                pathLength={1}
                {...n()}
                d={`M ${cx - jr} ${base} V ${nasce} A ${jr} ${jr} 0 0 1 ${cx + jr} ${nasce} V ${base} Z`}
              />
              <path
                pathLength={1}
                {...n()}
                d={`M ${cx - jr - 8} ${nasce} A ${jr + 8} ${jr + 8} 0 0 1 ${cx + jr + 8} ${nasce}`}
              />
              <line pathLength={1} {...n()} x1={cx} y1={topo} x2={cx} y2={base} />
              <line pathLength={1} {...n()} x1={cx - jr} y1={nasce} x2={cx + jr} y2={nasce} />
              {/* Peitoril na base da janela, como a soleira das portas no térreo */}
              <line pathLength={1} {...n()} x1={cx - jr - 8} y1={base} x2={cx + jr + 8} y2={base} />
            </g>
          );
        })}
      </g>

      {/* Arcadas do térreo; a do meio, mais larga e mais alta, é a entrada. */}
      <g className="tracos">
        {Array.from({ length: baias }, (_, i) => {
          const entrada = i === meio;
          const cx = M + i * bw + bw / 2;
          const r = ((entrada ? 0.72 : 0.6) * bw) / 2;
          const nasce = entrada ? SPRING - 28 : SPRING;
          const vao = `M ${cx - r} ${FLOOR} V ${nasce} A ${r} ${r} 0 0 1 ${cx + r} ${nasce} V ${FLOOR} Z`;
          const arquivolta = `M ${cx - r - 12} ${nasce} A ${r + 12} ${r + 12} 0 0 1 ${cx + r + 12} ${nasce}`;
          return (
            <g key={`a${i}`}>
              <path pathLength={1} {...n()} d={vao} />
              <path pathLength={1} {...n()} d={arquivolta} />
              <line pathLength={1} {...n()} x1={cx - r} y1={nasce} x2={cx + r} y2={nasce} />
              <line pathLength={1} {...n()} x1={cx} y1={nasce} x2={cx} y2={FLOOR} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
