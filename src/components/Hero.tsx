"use client";

import { useEffect, useState } from "react";
import type { Loja } from "@/content/lojas";
import { site } from "@/content/site";
import { Facade } from "./Facade";
import { Lockup } from "./Lockup";

// Hora atual em Goiânia (mesmo fuso de Brasília).
function horaEmGoiania() {
  const h = new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    hourCycle: "h23",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
  return Number(h);
}

export function Hero({ lojas }: { lojas: Loja[] }) {
  const [aceso, setAceso] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [foco, setFoco] = useState<string | null>(null);

  // Depois das 18h em Goiânia a fachada já abre com as luzes acesas.
  useEffect(() => {
    const h = horaEmGoiania();
    setAceso(h >= 18 || h < 6);
    const t = requestAnimationFrame(() => setPronto(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="hero" data-aceso={aceso} data-pronto={pronto}>
      <h1 className="sr-only">{site.nome}</h1>
      <Lockup className="hero-lockup" />

      <div className="hero-fachada">
        <Facade lojas={lojas} aceso={aceso} onFoco={setFoco} />
      </div>

      <div className="hero-rodape">
        <p className="hero-resumo">
          {site.resumo} {site.status}
          {site.abertura ? `. ${site.abertura}.` : "."}
        </p>
        <p className="hero-foco" aria-hidden="true">
          {foco ?? " "}
        </p>
        <button
          type="button"
          className="interruptor"
          aria-pressed={aceso}
          onClick={() => setAceso((v) => !v)}
        >
          {aceso ? "Apagar as luzes" : "Acender as luzes"}
        </button>
      </div>
    </section>
  );
}
