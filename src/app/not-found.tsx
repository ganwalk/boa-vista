import { Link } from "next-view-transitions";

export default function NaoEncontrado() {
  return (
    <section className="vazio">
      <h1 className="vazio-titulo">Esta página não existe.</h1>
      <p>
        O endereço pode ter mudado quando uma loja trocou de nome.{" "}
        <Link href="/#lojas">Ver todas as lojas</Link>
      </p>
    </section>
  );
}
