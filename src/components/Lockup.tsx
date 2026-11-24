// Assinatura da marca em HTML: "PÁTIO", filete com losangos, "BOA VISTA".
// Quando o arquivo vetorial oficial do logo existir, troque por <img src="/logo.svg">.

export function Lockup({
  className = "",
  horizontal = false,
}: {
  className?: string;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <p className={`lockup lockup--h ${className}`} aria-label="Pátio Boa Vista">
        <span className="lockup-fio" aria-hidden="true" />
        <span className="losango" aria-hidden="true" />
        <span className="lockup-nome" aria-hidden="true">
          Pátio Boa Vista
        </span>
        <span className="losango" aria-hidden="true" />
        <span className="lockup-fio" aria-hidden="true" />
      </p>
    );
  }

  return (
    <p className={`lockup ${className}`} aria-label="Pátio Boa Vista">
      <span className="lockup-a" aria-hidden="true">
        Pátio
      </span>
      <span className="lockup-filete" aria-hidden="true">
        <span className="losango" />
        <span className="lockup-fio" />
        <span className="losango" />
      </span>
      <span className="lockup-b" aria-hidden="true">
        Boa Vista
      </span>
    </p>
  );
}
