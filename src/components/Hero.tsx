"use client";

import { useEffect, useState } from "react";
import type { Loja } from "@/content/lojas";
import { site } from "@/content/site";
import { Facade } from "./Facade";
import { Lockup } from "./Lockup";

export function Hero({ lojas }: { lojas: Loja[] }) {
  const [foco, setFoco] = useState<Loja | null>(null);
  const [abertas, setAbertas] = useState(0);

  // Sem mouse não há hover. Para não amarrar tudo à rolagem no celular,
  // as arcadas se abrem sozinhas uma vez, logo depois que o desenho da fachada termina.
  useEffect(() => {
    const semHover = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!semHover) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) {
      setAbertas(lojas.length);
      return;
    }
    const timers = lojas.map((_, i) =>
      window.setTimeout(() => setAbertas(i + 1), 1500 + i * 160),
    );
    return () => timers.forEach(clearTimeout);
  }, [lojas.length]);

  const mostrada = foco;

  return (
    <section className="hero">
      <h1 className="sr-only">{site.nome}</h1>
      <Lockup className="hero-lockup" />

      <div className="hero-fachada">
        <Facade lojas={lojas} abertas={abertas} onFoco={setFoco} />
      </div>

      <div className="hero-rodape">
        <p className="hero-resumo">{site.resumo}</p>
        {/* À direita: a situação da obra, que dá lugar à loja da arcada em foco. */}
        <p className="hero-lado" aria-live="off">
          {mostrada ? (
            <>
              <span className="hero-foco-nome">{mostrada.nome}</span>
              <span className="hero-lado-sub">{mostrada.categoria}</span>
            </>
          ) : (
            <>
              <span>{site.status}</span>
              {site.abertura ? <span className="hero-lado-sub">{site.abertura}</span> : null}
            </>
          )}
        </p>
      </div>
    </section>
  );
}
