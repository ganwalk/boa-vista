"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import type { Loja } from "@/content/lojas";

// Desenho de linha da fachada: uma arcada por loja e a entrada no meio.
// Cada arcada é uma janela para a loja: com o mouse (ou foco) a foto aparece dentro do arco;
// sem mouse, as lojas se revezam sozinhas, uma arcada de cada vez.
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
  // Loja em destaque no revezamento automático (ordem na lista), ou null.
  destaque: number | null;
  onFoco: (alvo: Loja | "entrada" | null) => void;
  // Clique na porta central: leva até a lista de todas as lojas.
  onEntrar: () => void;
};

// Foto da loja em tamanho pequeno, servida pelo otimizador do Next.
const miniatura = (loja: Loja) => {
  const c = loja.capa;
  if (!c) return null;
  const src = c.tipo === "video" ? c.poster : c.src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;
};

export function Facade({ lojas, destaque, onFoco, onEntrar }: Props) {
  const [ativo, setAtivo] = useState<number | null>(null);
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

  const marcar = (i: number | null, alvo: Loja | "entrada" | null) => {
    setAtivo(i);
    onFoco(alvo);
  };

  return (
    <svg
      ref={svg}
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
        {/* Interior visto pela porta central aberta: luz quente ao fundo. */}
        <radialGradient id="interior" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#f3d39a" />
          <stop offset="35%" stopColor="#b98a4e" />
          <stop offset="75%" stopColor="#2b2a22" />
          <stop offset="100%" stopColor="#141a17" />
        </radialGradient>
      </defs>

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
              {/* Peitoril na base da janela, como a soleira das portas no térreo */}
              <line pathLength={1} {...n()} x1={cx - jr - 8} y1={base} x2={cx + jr + 8} y2={base} />
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
        const aberta = ordemLoja >= 0 && ordemLoja === destaque;

        const bandeira = `M ${cx - r} ${nasce} A ${r} ${r} 0 0 1 ${cx + r} ${nasce} Z`;
        const altoFolha = FLOOR - nasce;

        const desenho = item.entrada ? (
          <>
            {/* Porta central: interior iluminado atrás de duas folhas que se abrem. */}
            <path className="vao-interior" d={vao} fill="url(#interior)" />
            <path className="vao-bandeira" d={bandeira} fill="url(#luz)" />
            <g className="tracos">
              <path pathLength={1} {...n()} d={vao} />
              <path pathLength={1} {...n()} d={arquivolta} />
              <line pathLength={1} {...n()} x1={cx - r} y1={nasce} x2={cx + r} y2={nasce} />
              <rect className="folha folha--esq" pathLength={1} {...n()} x={cx - r} y={nasce} width={r} height={altoFolha} />
              <rect className="folha folha--dir" pathLength={1} {...n()} x={cx} y={nasce} width={r} height={altoFolha} />
            </g>
          </>
        ) : (
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
            y={BAND + 6}
            width={bw - 18}
            height={FLOOR - BAND - 6}
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
              onClick={(e) => {
                e.preventDefault();
                onEntrar();
              }}
              onMouseEnter={() => marcar(i, "entrada")}
              onMouseLeave={() => marcar(null, null)}
              onFocus={() => marcar(i, "entrada")}
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
