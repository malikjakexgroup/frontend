import { useState } from "react";

export default function SearchBar({ onSearch, initial = "" }) {
  const [value, setValue] = useState(initial);
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {/* soft gold halo that breathes behind the field */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(55%_120%_at_50%_50%,rgba(198,161,91,0.18),transparent_70%)] blur-2xl transition-opacity duration-700 ${
          focused ? "opacity-100" : "opacity-40"
        }`}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value.trim());
        }}
        className={`flex items-center gap-3 rounded-2xl border bg-white/[0.025] px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${
          focused
            ? "border-gold/50 shadow-[0_0_50px_-14px_rgba(198,161,91,0.55)]"
            : "border-line hover:border-line2"
        }`}
      >
        <svg
          className={`h-5 w-5 flex-none transition-colors ${focused ? "text-gold" : "text-faint"}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search by title, author, or subject"
          className="min-w-0 flex-1 bg-transparent py-2 text-lg text-ink outline-none placeholder:text-faint"
        />
        <kbd className="hidden select-none rounded-md border border-line px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-faint sm:block">
          Enter
        </kbd>
        <button className="flex-none rounded-xl bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#d8b673] hover:shadow-[0_0_30px_-6px_rgba(198,161,91,0.7)]">
          Search
        </button>
      </form>
    </div>
  );
}
