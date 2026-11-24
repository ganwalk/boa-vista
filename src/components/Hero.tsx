"use client";

import { useEffect, useRef, useState } from "react";
import type { Loja } from "@/content/lojas";
import { site } from "@/content/site";
import { irPara } from "@/lib/irPara";
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
  const [foco, setFoco] = useState<Loja | "entrada" | null>(null);
  const [destaque, setDestaque] = useState<number | null>(null);
  const [entrando, setEntrando] = useState(false);
  const secao = useRef<HTMLElement>(null);

  // As lojas se revezam sozinhas, no desktop e no celular, a partir do fim do desenho.
  // O hover numa arcada só sobrepõe o que aparece; o revezamento continua por trás.
  // Pausa com a aba escondida ou com a hero fora da tela; parado com movimento reduzido.
  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visivel = true;
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
    });
    if (secao.current) io.observe(secao.current);

    let intervalo = 0;
    const comeco = window.setTimeout(() => {
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

  const entrar = () => {
    setEntrando(true);
    // As folhas da porta terminam de abrir; então a lista de lojas sobe por cima da tela.
    window.setTimeout(() => {
      irPara("lojas");
      window.setTimeout(() => setEntrando(false), 900);
    }, 280);
  };

  // À direita: a arcada sob o mouse ou, sem hover, a loja da vez no revezamento.
  const lado =
    foco === "entrada"
      ? { nome: "Todas as lojas", sub: "Entrada" }
      : foco
        ? { nome: foco.nome, sub: foco.categoria }
        : destaque !== null
          ? { nome: lojas[destaque].nome, sub: lojas[destaque].categoria }
          : null;

  return (
    <section ref={secao} className="hero" data-entrando={entrando}>
      <h1 className="sr-only">{site.nome}</h1>
      <Lockup className="hero-lockup" />

      <div className="hero-fachada">
        <Facade
          lojas={lojas}
          destaque={foco === null ? destaque : null}
          onFoco={setFoco}
          onEntrar={entrar}
        />
      </div>

      <div className="hero-rodape">
        <div className="hero-esq">
          <p className="hero-resumo">{site.resumo}</p>
          <p className="hero-status">
            {site.status}
            {site.abertura ? `. ${site.abertura}` : ""}
          </p>
        </div>

        <p className="hero-lado" aria-hidden="true">
          {lado ? (
            <span className="hero-lado-troca" key={lado.nome}>
              <span className="hero-foco-nome">{lado.nome}</span>
              <span className="hero-lado-sub">{lado.sub}</span>
            </span>
          ) : null}
        </p>
      </div>
    </section>
  );
}
