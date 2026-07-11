import { useState } from "react";

export default function SearchBar({ onSearch, initial = "" }) {
  const [value, setValue] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value.trim());
      }}
      className="flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1.5 pl-4 shadow-sm focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-200"
    >
      <svg className="h-5 w-5 flex-none text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title, author, or topic…"
        className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-stone-400"
      />
      <button className="flex-none rounded-full bg-amber-800 px-5 py-2 font-medium text-white transition hover:bg-amber-900">
        Search
      </button>
    </form>
  );
}
