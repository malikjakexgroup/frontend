import { Routes, Route, NavLink, Link } from "react-router-dom";
import Search from "./pages/Search";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./hooks/useAuth";

const navClass = ({ isActive }) =>
  `transition ${isActive ? "text-amber-800 font-semibold" : "text-stone-500 hover:text-stone-800"}`;

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-[#faf8f4]/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span className="font-serif text-xl font-bold tracking-tight text-amber-900">Booknest</span>
          </Link>
          <nav className="hidden gap-5 text-sm font-medium sm:flex">
            <NavLink to="/" end className={navClass}>Discover</NavLink>
            <NavLink to="/favorites" className={navClass}>Favorites</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="hidden text-stone-500 sm:inline">
                  Hi, <span className="font-medium text-stone-700">{user.name || user.email}</span>
                </span>
                <button
                  onClick={logout}
                  className="rounded-full border border-stone-300 px-3 py-1 text-stone-600 transition hover:bg-stone-100"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-stone-600 hover:text-stone-900">Log in</NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-full bg-amber-800 px-4 py-1.5 font-medium text-white shadow-sm transition hover:bg-amber-900"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <footer className="border-t border-stone-200/70 py-6 text-center text-xs text-stone-400">
        Booknest · Powered by <span className="font-medium text-stone-500">WordPress</span>
      </footer>
    </div>
  );
}
