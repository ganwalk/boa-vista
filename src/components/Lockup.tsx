import { Logo } from "./Logo";

// Assinatura da marca. Empilhada: o logo vetorial da placa.
// Horizontal (rodapé): o logo entre dois filetes longos, como na versão horizontal do manual.

export function Lockup({
  className = "",
  horizontal = false,
}: {
  className?: string;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <div className={`lockup lockup--h ${className}`}>
        <span className="lockup-fio" aria-hidden="true" />
        <Logo />
        <span className="lockup-fio" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`lockup ${className}`}>
      <Logo />
    </div>
  );
}
