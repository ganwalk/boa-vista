"use client";

import { useEffect, useRef, useState } from "react";
import type { Loja } from "@/content/lojas";
import { site } from "@/content/site";
import { Facade } from "./Facade";
import { Lockup } from "./Lockup";

const INTERVALO = 3400; // tempo de cada loja no revezamento (ms)
const FIM_DO_DESENHO = 1500; // quando a fachada termina de se desenhar (ms)

// Rolagem suave até a lista de lojas, com aceleração e frenagem (ease-in-out).
function deslizarAte(alvo: HTMLElement) {
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const destino = alvo.getBoundingClientRect().top + window.scrollY;
  if (reduz) {
    window.scrollTo(0, destino);
  } else {
    const inicio = window.scrollY;
    const distancia = destino - inicio;
    const duracao = Math.min(1400, 700 + Math.abs(distancia) * 0.35);
    const t0 = performance.now();
    const html = document.documentElement;
    const antes = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - t0) / duracao);
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      window.scrollTo(0, inicio + distancia * e);
      if (t < 1) requestAnimationFrame(passo);
      else html.style.scrollBehavior = antes;
    };
    requestAnimationFrame(passo);
  }
  history.replaceState(null, "", "#lojas");
  alvo.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
}

export function Hero({ lojas }: { lojas: Loja[] }) {
  const [foco, setFoco] = useState<Loja | "entrada" | null>(null);
  const [abertas, setAbertas] = useState(0);
  const [destaque, setDestaque] = useState<number | null>(null);
  const [entrando, setEntrando] = useState(false);
  const secao = useRef<HTMLElement>(null);
  const pausado = useRef(false);
  pausado.current = foco !== null;

  useEffect(() => {
    const comHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Celular: as arcadas se abrem sozinhas uma vez, logo depois do desenho.
    if (!comHover) {
      if (reduz) {
        setAbertas(lojas.length);
        return;
      }
      const timers = lojas.map((_, i) =>
        window.setTimeout(() => setAbertas(i + 1), FIM_DO_DESENHO + i * 160),
      );
      return () => timers.forEach(clearTimeout);
    }

    // Desktop: as lojas se revezam na fachada e no texto à direita.
    // Pausa com o mouse numa arcada, com a aba escondida ou com a hero fora da tela.
    if (reduz) {
      setDestaque(0);
      return;
    }
    let visivel = true;
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
    });
    if (secao.current) io.observe(secao.current);

    let intervalo = 0;
    const comeco = window.setTimeout(() => {
      setDestaque(0);
      intervalo = window.setInterval(() => {
        if (pausado.current || document.hidden || !visivel) return;
        setDestaque((d) => ((d ?? -1) + 1) % lojas.length);
      }, INTERVALO);
    }, FIM_DO_DESENHO);

    return () => {
      clearTimeout(comeco);
      clearInterval(intervalo);
      io.disconnect();
    };
  }, [lojas.length]);

  const entrar = () => {
    const alvo = document.getElementById("lojas");
    if (!alvo) return;
    setEntrando(true);
    // As folhas da porta terminam de abrir antes de a página deslizar.
    window.setTimeout(() => {
      deslizarAte(alvo);
      window.setTimeout(() => setEntrando(false), 1200);
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
          abertas={abertas}
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
