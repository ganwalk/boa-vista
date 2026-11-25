import Image from "next/image";

// Perspectivas do projeto, da apresentação da ARL (agosto de 2026).
// São imagens ilustrativas: a obra está em andamento.

type Vista = { src: string; alt: string; legenda: string; largura: number; altura: number; classe: string };

const vistas: Vista[] = [
  {
    src: "/projeto/fachada-frontal.jpg",
    alt: "Fachada de três pavimentos em pedra clara, com janelas em arco iluminadas e jardim na frente.",
    legenda: "Fachada voltada para o estacionamento",
    largura: 1677,
    altura: 938,
    classe: "projeto-vista--larga",
  },
  {
    src: "/projeto/entrada.jpg",
    alt: "Entrada com marquise curva de ferro e o letreiro Pátio Boa Vista sobre portas de vidro, mesas na varanda.",
    legenda: "Entrada principal",
    largura: 1700,
    altura: 925,
    classe: "projeto-vista--esq",
  },
  {
    src: "/projeto/calcada.jpg",
    alt: "Calçada de pedra diante da fachada em arcos, com postes de ferro, árvores em vasos e pessoas passeando.",
    legenda: "Calçada da galeria",
    largura: 1723,
    altura: 913,
    classe: "projeto-vista--dir",
  },
  {
    src: "/projeto/hall.jpg",
    alt: "Hall com piso de ladrilho geométrico, duas árvores em jardineiras e sofás curvos cor de terracota.",
    legenda: "Hall de acesso",
    largura: 1770,
    altura: 889,
    classe: "projeto-vista--meio",
  },
  {
    src: "/projeto/varanda.jpg",
    alt: "Varanda coberta com piso de ladrilho, arandelas acesas e vista para as palmeiras ao pôr do sol.",
    legenda: "Varanda",
    largura: 1659,
    altura: 948,
    classe: "projeto-vista--esq",
  },
  {
    src: "/projeto/aerea.jpg",
    alt: "Vista aérea do conjunto ao entardecer, com o portal de entrada do estacionamento e o prédio em arcos.",
    legenda: "Conjunto e portal do estacionamento",
    largura: 1672,
    altura: 941,
    classe: "projeto-vista--dir",
  },
];

export function Projeto() {
  return (
    <section id="projeto" className="projeto" aria-labelledby="projeto-titulo">
      <div className="projeto-topo">
        <h2 id="projeto-titulo" className="secao-titulo">
          O projeto
        </h2>
        <p className="projeto-texto">
          Pedra clara, arcos com caixilhos pretos e uma marquise de ferro e vidro sobre
          a entrada. São dois subsolos, térreo e primeiro pavimento, com estacionamento
          dentro do terreno.
        </p>
      </div>

      <div className="projeto-galeria">
        {vistas.map((v, i) => (
          <figure key={v.src} className={`projeto-vista ${v.classe}`}>
            <Image
              src={v.src}
              alt={v.alt}
              width={v.largura}
              height={v.altura}
              sizes={i === 0 ? "100vw" : "(min-width: 900px) 60vw, 100vw"}
            />
            <figcaption>{v.legenda}</figcaption>
          </figure>
        ))}
      </div>

      <p className="projeto-credito">
        Perspectivas: ARL, Andréia Rocha Lima. Imagens ilustrativas, sujeitas a alterações
        durante a obra.
      </p>
    </section>
  );
}
