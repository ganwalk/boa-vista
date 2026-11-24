import { site } from "@/content/site";
import { Contato } from "./Contato";
import { Lockup } from "./Lockup";

export function Rodape() {
  return (
    <footer className="rodape">
      <Lockup horizontal className="rodape-lockup" />
      <div className="rodape-linha">
        <p>
          {site.endereco || `${site.cidade}, Goiás`}
        </p>
        <Contato />
        <p>© {new Date().getFullYear()} {site.nome}</p>
      </div>
    </footer>
  );
}
