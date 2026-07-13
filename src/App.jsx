import { Routes, Route, NavLink, Link } from "react-router-dom";
import Search from "./pages/Search";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./hooks/useAuth";

const navClass = ({ isActive }) =>
  `text-[11px] uppercase tracking-[0.22em] transition-colors ${
    isActive ? "text-gold" : "text-muted hover:text-ink"
  }`;

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-8 px-6 py-4">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Book<span className="text-gold">nest</span>
          </Link>
          <nav className="hidden gap-7 sm:flex">
            <NavLink to="/" end className={navClass}>Discover</NavLink>
            <NavLink to="/favorites" className={navClass}>Favorites</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-5 text-[11px] uppercase tracking-[0.18em]">
            {user ? (
              <>
                <span className="hidden text-muted sm:inline">
                  {user.name || user.email}
                </span>
                <button onClick={logout} className="text-muted transition-colors hover:text-ink">
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-muted transition-colors hover:text-ink">
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-full border border-gold/40 px-4 py-1.5 text-gold hover:bg-gold hover:text-black hover:shadow-[0_0_26px_-6px_rgba(198,161,91,0.6)]"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <footer className="mt-16 border-t border-line py-10 text-center">
        <p className="font-display text-lg">
          Book<span className="text-gold">nest</span>
        </p>
        <p className="mt-1.5 text-[10px] uppercase tracking-[0.28em] text-faint">
          A quiet place for books
        </p>
      </footer>
    </div>
  );
}
