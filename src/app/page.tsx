import Image from "next/image";
import { Contato } from "@/components/Contato";
import { Hero } from "@/components/Hero";
import { Indice } from "@/components/Indice";
import { Projeto } from "@/components/Projeto";
import { Vitrines } from "@/components/Vitrines";
import { lojas } from "@/content/lojas";
import { ficha, regimeObra } from "@/content/site";

export default function Home() {
  const temEspacoLivre = lojas.some((l) => l.disponivel);

  return (
    <>
      <Hero lojas={lojas} />
      <Vitrines lojas={lojas} />
      <Indice lojas={lojas} />

      {/* O Pátio: título numa linha larga e, embaixo, dois blocos de texto do mesmo peso,
          um sobre o dia a dia e outro sobre o projeto. */}
      <section id="o-patio" className="patio" aria-labelledby="patio-titulo">
        <h2 id="patio-titulo" className="patio-frase">
          Um pátio no meio dos condomínios Jardins.
        </h2>
        {/* Texto aprovado pela cliente, mantido como enviado. */}
        <p className="patio-texto">
          O Pátio Boa Vista nasce com a proposta de ser mais do que um espaço de compras e
          serviços: um novo ponto de encontro, convivência e lazer para uma região cercada por
          condomínios residenciais. Com uma arquitetura clássica e imponente, que traduz
          elegância e sofisticação, o empreendimento foi concebido para proporcionar
          experiências agradáveis, valorizar o tempo compartilhado e integrar-se ao cotidiano
          da comunidade. Um lugar onde conveniência, bem-estar e boas experiências se
          encontram em uma atmosfera acolhedora e exclusiva.
        </p>
        <figure className="patio-fachada">
          <Image
            src="/projeto/fachada.jpg"
            alt="Perspectiva da fachada do Pátio Boa Vista ao entardecer: arcos iluminados e a entrada central com o nome da galeria."
            width={1578}
            height={648}
            sizes="(min-width: 1200px) 1330px, 100vw"
          />
          <figcaption>Perspectiva ilustrativa da fachada, sujeita a alterações durante a obra.</figcaption>
        </figure>
        {temEspacoLivre && (
          <div className="patio-locacao">
            <p>Ainda há espaços disponíveis para locação.</p>
            <Contato assunto="aluguel de um espaço no Pátio Boa Vista" />
          </div>
        )}
      </section>

      <Projeto />

      <section id="ficha" className="ficha" aria-labelledby="ficha-titulo">
        <h2 id="ficha-titulo" className="secao-titulo">
          Ficha técnica
        </h2>
        <p className="ficha-regime">{regimeObra}</p>
        <dl className="ficha-lista">
          {ficha.map((f) => (
            <div key={f.papel} className="ficha-item">
              <dt>{f.papel}</dt>
              {f.nomes.map((n) => (
                <dd key={n.nome}>
                  {n.nome}
                  {n.registro ? <span className="ficha-registro">{n.registro}</span> : null}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
