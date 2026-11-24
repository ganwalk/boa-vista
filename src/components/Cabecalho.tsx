import { Link } from "next-view-transitions";
import { LinkSecao } from "./LinkSecao";
import { Logo } from "./Logo";

export function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link href="/" className="marca" aria-label="Pátio Boa Vista, página inicial">
        <Logo titulo={false} />
      </Link>
      <nav aria-label="Principal">
        <ul>
          <li>
            <LinkSecao id="lojas">Lojas</LinkSecao>
          </li>
          <li>
            <LinkSecao id="o-patio">O Pátio</LinkSecao>
          </li>
          <li>
            <LinkSecao id="ficha">Ficha técnica</LinkSecao>
          </li>
        </ul>
      </nav>
    </header>
  );
}
