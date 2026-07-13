import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-faint focus:border-gold";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Sign up failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm pt-10">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Join Booknest</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight">Create account</h1>
      <form onSubmit={submit} className="mt-8 space-y-6">
        {error && (
          <p className="border-l-2 border-rose/60 pl-3 text-sm text-rose">{error}</p>
        )}
        <input placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} className={inputClass} />
        <input type="email" required placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        <input type="password" required minLength={6} placeholder="Password (6+ characters)" value={password}
          onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        <button disabled={busy}
          className="w-full rounded-full bg-gold py-3 text-xs uppercase tracking-[0.2em] text-black hover:bg-[#d8b673] hover:shadow-[0_0_30px_-8px_rgba(198,161,91,0.6)] disabled:opacity-50">
          {busy ? "…" : "Create account"}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-muted">
        Already a member?{" "}
        <Link to="/login" className="text-gold hover:underline">Log in</Link>
      </p>
    </div>
  );
}
