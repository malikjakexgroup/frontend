export default function Stars({ rating }) {
  const value = Number(rating);
  if (!value) {
    return <span className="text-[10px] uppercase tracking-[0.18em] text-faint">Unrated</span>;
  }
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1.5" title={`${value} / 5`}>
      <span className="text-xs tracking-[0.15em] text-gold" aria-hidden="true">
        {"★".repeat(full)}
        <span className="text-faint">{"★".repeat(5 - full)}</span>
      </span>
      <span className="text-[11px] tabular-nums text-muted">{value.toFixed(1)}</span>
    </span>
  );
}
