import { Contato } from "@/components/Contato";
import { Hero } from "@/components/Hero";
import { Indice } from "@/components/Indice";
import { Vitrines } from "@/components/Vitrines";
import { lojas } from "@/content/lojas";
import { ficha, site } from "@/content/site";

export default function Home() {
  const temEspacoLivre = lojas.some((l) => l.disponivel);

  return (
    <>
      <Hero lojas={lojas} />
      <Vitrines lojas={lojas} />
      <Indice lojas={lojas} />

      <section id="o-patio" className="patio" aria-labelledby="patio-titulo">
        <h2 id="patio-titulo" className="patio-frase">
          Lojas, serviços e gastronomia para quem mora nos Jardins.
        </h2>
        <div className="patio-texto">
          <p>
            O {site.nome} está em obra numa região de {site.cidade} cercada por
            condomínios residenciais. O projeto arquitetônico, da Nuanza Arq &amp;
            Interiores, segue a linha clássica. A ideia é que o morador resolva o
            dia, almoce e encontre os vizinhos sem atravessar a cidade.
          </p>
          {temEspacoLivre && (
            <div className="patio-locacao">
              <p>Ainda há espaços disponíveis para locação.</p>
              <Contato assunto="aluguel de um espaço no Pátio Boa Vista" />
            </div>
          )}
        </div>
      </section>

      <section id="ficha" className="ficha" aria-labelledby="ficha-titulo">
        <h2 id="ficha-titulo" className="secao-titulo">
          Ficha técnica
        </h2>
        <dl className="ficha-lista">
          {ficha.map((f) => (
            <div key={f.papel} className="ficha-item">
              <dt>{f.papel}</dt>
              {f.nomes.map((n) => (
                <dd key={n}>{n}</dd>
              ))}
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
