import { site } from "@/content/site";

// Mostra só os canais que estão preenchidos em src/content/site.ts.
export function Contato({ assunto }: { assunto?: string }) {
  const { email, whatsapp, instagram } = site.contato;
  if (!email && !whatsapp && !instagram) return null;

  const texto = assunto ? `Olá, gostaria de saber sobre o ${assunto}.` : "";

  return (
    <ul className="contato">
      {whatsapp && (
        <li>
          <a href={`https://wa.me/${whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`}>
            WhatsApp
          </a>
        </li>
      )}
      {email && (
        <li>
          <a href={`mailto:${email}${assunto ? `?subject=${encodeURIComponent(assunto)}` : ""}`}>
            {email}
          </a>
        </li>
      )}
      {instagram && (
        <li>
          <a href={`https://instagram.com/${instagram}`}>Instagram</a>
        </li>
      )}
    </ul>
  );
}
