import { Contato } from "@/components/Contato";
import { Hero } from "@/components/Hero";
import { Indice } from "@/components/Indice";
import { Projeto } from "@/components/Projeto";
import { Vitrines } from "@/components/Vitrines";
import { lojas } from "@/content/lojas";
import { ficha, regimeObra } from "@/content/site";

// Número por extenso no começo da frase ("Seis lojas…", não "6 lojas…").
const porExtenso = (n: number) =>
  ["Nenhuma", "Uma", "Duas", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez"][n] ??
  String(n);

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
        <div className="patio-colunas">
          <p>
            {porExtenso(lojas.length)} lojas no térreo, entre padaria, restaurante, joalheria,
            empório, perfumaria e floricultura. Dá para resolver a semana, almoçar
            e encontrar os vizinhos sem atravessar Goiânia.
          </p>
          <p>
            O projeto arquitetônico é da Nuanza Arq &amp; Interiores, com paisagismo
            de Fernanda Simão. A obra está em andamento.
          </p>
        </div>
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
