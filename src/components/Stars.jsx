export default function Stars({ rating }) {
  const value = Number(rating);
  if (!value) return <span className="text-xs text-stone-400">No rating</span>;
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1 text-amber-500" title={`${value} / 5`}>
      <span aria-hidden="true">
        {"★".repeat(full)}
        <span className="text-stone-300">{"★".repeat(5 - full)}</span>
      </span>
      <span className="text-xs font-medium text-stone-500">{value.toFixed(1)}</span>
    </span>
  );
}
