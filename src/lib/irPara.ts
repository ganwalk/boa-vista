// Leva a uma seção da home sem rolar a página por todo o caminho:
// a seção de destino sobe por cima da tela atual (View Transitions API).
// Sem suporte no navegador ou com `prefers-reduced-motion`, o salto é direto.

export function irPara(id: string) {
  const alvo = document.getElementById(id);
  if (!alvo) return;

  const mudar = () => {
    const topo = alvo.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: topo, behavior: "instant" });
    history.replaceState(null, "", `#${id}`);
    alvo.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };

  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  if (reduz || !doc.startViewTransition) {
    mudar();
    return;
  }

  const html = document.documentElement;
  html.classList.add("vt-cobrir");
  const t = doc.startViewTransition(mudar);
  t.finished.finally(() => html.classList.remove("vt-cobrir"));
}
