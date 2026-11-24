import { Link } from "next-view-transitions";

export function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link href="/" className="marca">
        Pátio Boa Vista
      </Link>
      <nav aria-label="Principal">
        <ul>
          <li>
            <Link href="/#lojas">Lojas</Link>
          </li>
          <li>
            <Link href="/#o-patio">O Pátio</Link>
          </li>
          <li>
            <Link href="/#ficha">Ficha técnica</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
