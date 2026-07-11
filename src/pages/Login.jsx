import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
      <h1 className="font-serif text-2xl font-bold text-stone-800">Welcome back</h1>
      <p className="mt-1 text-sm text-stone-500">Log in to save your favorite books.</p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <input type="email" required placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        <input type="password" required placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        <button disabled={busy}
          className="w-full rounded-lg bg-amber-800 py-2.5 font-medium text-white transition hover:bg-amber-900 disabled:opacity-50">
          {busy ? "…" : "Log in"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-stone-500">
        No account? <Link to="/signup" className="font-medium text-amber-800 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
