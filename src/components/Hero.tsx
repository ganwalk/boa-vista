"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Loja } from "@/content/lojas";
import { site } from "@/content/site";
import { Facade } from "./Facade";
import { Lockup } from "./Lockup";

const INTERVALO = 3400; // tempo de cada loja no revezamento (ms)

// Quando o último traço da fachada termina de se desenhar (ms), lido do próprio desenho:
// cada traço espera `--i × 9ms` e leva 1,1s (ver @keyframes desenhar no CSS).
function fimDoDesenho(raiz: HTMLElement | null) {
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduz || !raiz) return 0;
  let maior = 0;
  raiz.querySelectorAll<SVGElement>(".tracos [style]").forEach((el) => {
    const i = Number(el.style.getPropertyValue("--i"));
    if (i > maior) maior = i;
  });
  return maior * 9 + 1100;
}

export function Hero({ lojas }: { lojas: Loja[] }) {
  const [destaque, setDestaque] = useState<number | null>(null);
  const [revelado, setRevelado] = useState(false);
  const secao = useRef<HTMLElement>(null);

  // No fim do desenho: a perspectiva do projeto aparece no lugar do traço
  // e as lojas começam a se revezar no rodapé. Pausa com a aba escondida
  // ou com a hero fora da tela; com movimento reduzido, tudo já aparece pronto.
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visivel = true;
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
    });
    if (secao.current) io.observe(secao.current);

    let intervalo = 0;
    const comeco = window.setTimeout(() => {
      setRevelado(true);
      setDestaque(0);
      if (reduz) return;
      intervalo = window.setInterval(() => {
        if (document.hidden || !visivel) return;
        setDestaque((d) => ((d ?? -1) + 1) % lojas.length);
      }, INTERVALO);
    }, fimDoDesenho(secao.current));

    return () => {
      clearTimeout(comeco);
      clearInterval(intervalo);
      io.disconnect();
    };
  }, [lojas.length]);

  const loja = destaque !== null ? lojas[destaque] : null;

  return (
    <section ref={secao} className="hero" data-revelado={revelado}>
      <h1 className="sr-only">{site.nome}</h1>
      <Lockup className="hero-lockup" />

      <figure className="hero-fachada">
        <Facade />
        <Image
          className="hero-perspectiva"
          src="/projeto/fachada-rua.jpg"
          alt="Perspectiva do Pátio Boa Vista ao entardecer: a fachada em arcos vista da rua, com a entrada central iluminada."
          width={1866}
          height={843}
          sizes="(min-width: 1200px) 1180px, 100vw"
          priority
        />
      </figure>

      <div className="hero-rodape">
        <div className="hero-esq">
          <p className="hero-resumo">{site.resumo}</p>
          <p className="hero-status">
            {site.status}
            {site.abertura ? `. ${site.abertura}` : ""}
          </p>
        </div>

        <p className="hero-lado" aria-hidden="true">
          {loja ? (
            <span className="hero-lado-troca" key={loja.nome}>
              <span className="hero-foco-nome">{loja.nome}</span>
              <span className="hero-lado-sub">{loja.categoria}</span>
            </span>
          ) : null}
        </p>
      </div>
    </section>
  );
}
