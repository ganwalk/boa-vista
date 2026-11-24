"use client";

import { Link } from "next-view-transitions";
import { useState } from "react";
import type { Loja } from "@/content/lojas";

// Desenho de linha da fachada: uma arcada por loja e a entrada no meio.
// Cada arcada é uma janela para a loja: com o mouse (ou foco) a foto aparece dentro do arco;
// no celular, as arcadas se abrem uma a uma conforme a página rola.
// É um estudo provisório. Quando a Nuanza liberar a elevação oficial,
// troque as coordenadas abaixo pelo desenho do projeto.

const W = 1400;
const H = 640;
const M = 40; // margem lateral
const TOP = 64; // base da cornija
const BAND = 300; // faixa entre pavimentos
const SPRING = 420; // nascimento dos arcos
const FLOOR = 600; // soleira

type Props = {
  lojas: Loja[];
  // Quantas arcadas de loja já estão abertas pela rolagem (celular), da esquerda para a direita.
  abertas: number;
  onFoco: (loja: Loja | null) => void;
};

// Foto da loja em tamanho pequeno, servida pelo otimizador do Next.
const miniatura = (loja: Loja) => {
  const c = loja.capa;
  if (!c) return null;
  const src = c.tipo === "video" ? c.poster : c.src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;
};

export function Facade({ lojas, abertas, onFoco }: Props) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const meio = Math.floor(lojas.length / 2);
  const baias = lojas.length + 1;
  const bw = (W - M * 2) / baias;

  // Cada baia recebe uma loja, exceto a do meio, que é a entrada.
  const itens = Array.from({ length: baias }, (_, i) => {
    if (i === meio) return { entrada: true as const };
    const loja = lojas[i < meio ? i : i - 1];
    return { entrada: false as const, loja };
  });

  let ordem = 0;
  const n = () => ({ style: { ["--i" as string]: ordem++ } });

  const marcar = (i: number | null, loja: Loja | null) => {
    setAtivo(i);
    onFoco(loja);
  };

  return (
    <svg
      className="facade"
      viewBox={`0 0 ${W} ${H}`}
      role="group"
      aria-label="Fachada do Pátio Boa Vista. Cada arcada leva a uma loja."
    >
      <defs>
        <radialGradient id="luz" cx="50%" cy="78%" r="75%">
          <stop offset="0%" stopColor="var(--luz-1)" />
          <stop offset="55%" stopColor="var(--luz-2)" />
          <stop offset="100%" stopColor="var(--luz-3)" />
        </radialGradient>
      </defs>

      {/* Cornija */}
      <g className="tracos">
        <line pathLength={1} {...n()} x1={M - 20} y1={40} x2={W - M + 20} y2={40} />
        <line pathLength={1} {...n()} x1={M - 12} y1={52} x2={W - M + 12} y2={52} />
        <line pathLength={1} {...n()} x1={M} y1={TOP} x2={W - M} y2={TOP} />
        <line pathLength={1} {...n()} x1={M - 8} y1={BAND - 8} x2={W - M + 8} y2={BAND - 8} />
        <line pathLength={1} {...n()} x1={M - 8} y1={BAND + 4} x2={W - M + 8} y2={BAND + 4} />
        <line pathLength={1} {...n()} x1={M - 20} y1={FLOOR} x2={W - M + 20} y2={FLOOR} />
        <line pathLength={1} {...n()} x1={M - 28} y1={FLOOR + 14} x2={W - M + 28} y2={FLOOR + 14} />

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
        {itens.map((_, i) => {
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
              <line pathLength={1} {...n()} x1={cx - jr - 8} y1={226} x2={cx + jr + 8} y2={226} />
            </g>
          );
        })}
      </g>

      {/* Arcadas */}
      {itens.map((item, i) => {
        const cx = M + i * bw + bw / 2;
        // A entrada é mais larga e mais alta que as lojas.
        const r = ((item.entrada ? 0.72 : 0.6) * bw) / 2;
        const nasce = item.entrada ? SPRING - 28 : SPRING;
        const vao = `M ${cx - r} ${FLOOR} V ${nasce} A ${r} ${r} 0 0 1 ${cx + r} ${nasce} V ${FLOOR} Z`;
        const arquivolta = `M ${cx - r - 12} ${nasce} A ${r + 12} ${r + 12} 0 0 1 ${cx + r + 12} ${nasce}`;

        const ordemLoja = item.entrada ? -1 : i < meio ? i : i - 1;
        const foto = item.entrada ? null : miniatura(item.loja);
        const aberta = ordemLoja >= 0 && ordemLoja < abertas;

        const desenho = (
          <>
            {foto ? (
              <>
                <clipPath id={`arco-${i}`}>
                  <path d={vao} />
                </clipPath>
                <g clipPath={`url(#arco-${i})`}>
                  <image
                    className="vao-foto"
                    data-aberta={aberta}
                    href={foto}
                    x={cx - r}
                    y={nasce - r}
                    width={r * 2}
                    height={FLOOR - nasce + r}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
              </>
            ) : (
              <path className="vao-luz" d={vao} fill="url(#luz)" />
            )}
            <g className="tracos">
              <path pathLength={1} {...n()} d={vao} />
              <path pathLength={1} {...n()} d={arquivolta} />
              <line pathLength={1} {...n()} x1={cx - r} y1={nasce} x2={cx + r} y2={nasce} />
              <line pathLength={1} {...n()} x1={cx} y1={nasce} x2={cx} y2={FLOOR} />
            </g>
          </>
        );

        const alvo = (
          <rect
            className="alvo"
            x={M + i * bw + 9}
            y={BAND + 4}
            width={bw - 18}
            height={FLOOR - BAND - 4}
          />
        );

        if (item.entrada) {
          return (
            <a
              key="entrada"
              href="#lojas"
              className="arco entrada"
              data-ativo={ativo === i}
              aria-label="Entrada: ver todas as lojas"
              onMouseEnter={() => marcar(i, null)}
              onMouseLeave={() => marcar(null, null)}
              onFocus={() => marcar(i, null)}
              onBlur={() => marcar(null, null)}
            >
              {alvo}
              {desenho}
            </a>
          );
        }

        const { loja } = item;
        return (
          <Link
            key={loja.slug}
            href={`/lojas/${loja.slug}`}
            className="arco"
            data-ativo={ativo === i}
            aria-label={`${loja.nome}, ${loja.categoria}`}
            onMouseEnter={() => marcar(i, loja)}
            onMouseLeave={() => marcar(null, null)}
            onFocus={() => marcar(i, loja)}
            onBlur={() => marcar(null, null)}
          >
            {alvo}
            {desenho}
          </Link>
        );
      })}
    </svg>
  );
}
