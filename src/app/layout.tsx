import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { site } from "@/content/site";
import "./globals.css";

// Tipografia da marca: Cabrito Didone (principal) e Montserrat (complementar).
// A Cabrito Didone é paga. Até a licença chegar, a Bodoni Moda (OFL) ocupa o lugar.
// Para trocar: coloque os .woff2 da Cabrito em src/fonts/ e aponte `src` para eles.
const didone = localFont({
  src: [{ path: "../fonts/bodoni-moda-latin.woff2", weight: "400 900", style: "normal" }],
  variable: "--f-didone",
  display: "swap",
});

const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--f-texto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.nome, template: `%s, ${site.nome}` },
  description: site.resumo,
  openGraph: { title: site.nome, description: site.resumo, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#F1EBE2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="pt-BR" className={`${didone.variable} ${montserrat.variable}`}>
        <body>
          <a href="#conteudo" className="pular">
            Pular para o conteúdo
          </a>
          <Cabecalho />
          <main id="conteudo">{children}</main>
          <Rodape />
        </body>
      </html>
    </ViewTransitions>
  );
}
