import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { Contato } from "@/components/Contato";
import { Media } from "@/components/Media";
import { getLoja, lojas, vizinhas } from "@/content/lojas";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lojas.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const loja = getLoja((await params).slug);
  if (!loja) return {};
  return {
    title: loja.nome,
    description: loja.descricao ?? `${loja.nome}: ${loja.categoria}.`,
  };
}

export default async function PaginaLoja({ params }: Params) {
  const loja = getLoja((await params).slug);
  if (!loja) notFound();

  const { proxima } = vizinhas(loja.slug);
  const galeria = loja.galeria ?? [];

  const detalhes = [
    loja.local && { k: "Onde", v: loja.local },
    loja.horario && { k: "Horário", v: loja.horario },
    loja.telefone && { k: "Telefone", v: loja.telefone, href: `tel:${loja.telefone.replace(/\D/g, "")}` },
    loja.instagram && { k: "Instagram", v: `@${loja.instagram}`, href: `https://instagram.com/${loja.instagram}` },
  ].filter(Boolean) as { k: string; v: string; href?: string }[];

  return (
    <article className="loja">
      <header className="loja-topo">
        <Link href="/#lojas" className="voltar">
          Todas as lojas
        </Link>
        <h1 className="loja-nome">{loja.nome}</h1>
        <p className="loja-cat">{loja.categoria}</p>
      </header>

      <Media
        midia={loja.capa}
        loja={loja}
        sizes="100vw"
        priority
        className="loja-capa"
        style={{ viewTransitionName: `capa-${loja.slug}` }}
      />

      <div className="loja-corpo">
        <div className="loja-descricao">
          {loja.descricao ? (
            <p>{loja.descricao}</p>
          ) : loja.disponivel ? (
            <>
              <p>
                Este espaço ainda não tem locatário. Fotos e descrição entram aqui
                quando o contrato for fechado.
              </p>
              <Contato assunto={`aluguel do ${loja.nome}`} />
            </>
          ) : null}
        </div>

        {detalhes.length > 0 && (
          <dl className="loja-detalhes">
            {detalhes.map((d) => (
              <div key={d.k}>
                <dt>{d.k}</dt>
                <dd>{d.href ? <a href={d.href}>{d.v}</a> : d.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {galeria.length > 0 && (
        <section className="loja-galeria" aria-label={`Fotos de ${loja.nome}`}>
          {galeria.map((m, i) => (
            <Media
              key={m.src}
              midia={m}
              loja={loja}
              sizes={i % 3 === 0 ? "100vw" : "(min-width: 900px) 50vw, 100vw"}
              className={`galeria-item galeria-item--${i % 3}`}
            />
          ))}
        </section>
      )}

      <nav className="proxima" aria-label="Próxima loja">
        <Link href={`/lojas/${proxima.slug}`}>
          <span className="proxima-rotulo">Próxima loja</span>
          <span className="proxima-nome">{proxima.nome}</span>
        </Link>
      </nav>
    </article>
  );
}
