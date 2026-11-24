import type { Loja } from "@/content/lojas";

// Prancha da marca para espaços que ainda não têm foto.
// Um arco em linha dourada e o número do espaço, alternando verde e pedra.

export function Plate({ loja }: { loja: Loja }) {
  const num = loja.slug.match(/\d+/)?.[0] ?? "";
  const escuro = Number(num) % 2 === 1;

  return (
    <svg
      className={`prancha ${escuro ? "prancha--verde" : "prancha--pedra"}`}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${loja.nome}: ainda sem fotos`}
    >
      <rect x="-2000" y="-2000" width="4400" height="4500" className="prancha-fundo" />
      <path
        className="prancha-arco"
        d="M 120 440 V 230 A 80 80 0 0 1 280 230 V 440"
      />
      <path className="prancha-arco" d="M 108 230 A 92 92 0 0 1 292 230" />
      <line className="prancha-arco" x1="90" y1="440" x2="310" y2="440" />
      <text className="prancha-num" x="200" y="372" textAnchor="middle">
        {num}
      </text>
    </svg>
  );
}
