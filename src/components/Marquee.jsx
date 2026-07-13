import { Link } from "react-router-dom";
import { coverUrl } from "../lib/books";

// A slow, continuous wall of covers that drifts sideways — pauses on hover.
export default function Marquee({ books, reverse = false }) {
  if (!books || books.length === 0) return null;
  const row = [...books, ...books]; // duplicate for a seamless loop

  return (
    <div className="marquee group relative overflow-hidden py-1">
      {/* fade the edges into black */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <div className={`marquee-track flex w-max gap-4 ${reverse ? "marquee-reverse" : ""}`}>
        {row.map((b, i) => (
          <Link
            key={`${b.google_id}-${i}`}
            to={`/book/${b.google_id}`}
            className="relative block aspect-[2/3] w-[112px] flex-none overflow-hidden rounded-[2px] ring-1 ring-line transition duration-500 hover:ring-gold/50 hover:brightness-110"
            title={b.title}
          >
            <img src={coverUrl(b.thumbnail)} alt={b.title || ""} loading="lazy" className="h-full w-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  );
}
