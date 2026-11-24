"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { irPara } from "@/lib/irPara";

// Link para uma seção da home. Já na home, a seção sobe por cima da tela
// em vez de a página rolar até ela; em outras páginas, navega normalmente.
export function LinkSecao({ id, children }: { id: string; children: React.ReactNode }) {
  const naHome = usePathname() === "/";
  return (
    <Link
      href={`/#${id}`}
      onClick={(e) => {
        if (!naHome) return;
        e.preventDefault();
        irPara(id);
      }}
    >
      {children}
    </Link>
  );
}
