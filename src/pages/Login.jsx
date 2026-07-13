import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { forgotPassword, verifyOtp } from "../services/api";

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-faint focus:border-gold";

// login → forgot (email) → code → password
export default function Login() {
  const { login, reset } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const go = (m) => {
    setMode(m);
    setError("");
    setInfo("");
  };

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login(email, password);
        navigate("/");
      } else if (mode === "forgot") {
        const res = await forgotPassword(email);
        setInfo(res.message || "A 6-digit code has been sent to your email.");
        setMode("code");
      } else if (mode === "code") {
        if (otp.trim().length !== 6) throw new Error("Enter the full 6-digit code.");
        await verifyOtp(email, otp.trim());
        setInfo("Code verified. Choose a new password.");
        setMode("password");
      } else if (mode === "password") {
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        await reset(email, otp.trim(), password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const heading = {
    login: "Log in",
    forgot: "Forgot password",
    code: "Enter the code",
    password: "Set a new password",
  }[mode];
  const eyebrow = {
    login: "Welcome back",
    forgot: "Reset access",
    code: `We emailed ${email}`,
    password: "Almost done",
  }[mode];
  const cta = {
    login: "Log in",
    forgot: "Send code",
    code: "Continue",
    password: "Reset password",
  }[mode];

  return (
    <div className="mx-auto max-w-sm pt-10">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight">{heading}</h1>

      <form onSubmit={submit} className="mt-8 space-y-6">
        {error && <p className="border-l-2 border-rose/60 pl-3 text-sm text-rose">{error}</p>}
        {info && <p className="border-l-2 border-gold/60 pl-3 text-sm text-gold">{info}</p>}

        {(mode === "login" || mode === "forgot") && (
          <input type="email" required placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        )}

        {mode === "code" && (
          <input inputMode="numeric" maxLength={6} required placeholder="6-digit code"
            value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className={`${inputClass} text-center text-2xl tracking-[0.5em]`} />
        )}

        {(mode === "login" || mode === "password") && (
          <input type="password" required placeholder={mode === "password" ? "New password" : "Password"}
            value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        )}

        {mode === "login" && (
          <div className="text-right">
            <button type="button" onClick={() => go("forgot")}
              className="text-xs text-muted transition-colors hover:text-gold">
              Forgot password?
            </button>
          </div>
        )}

        <button disabled={busy}
          className="w-full rounded-full bg-gold py-3 text-xs uppercase tracking-[0.2em] text-black hover:bg-[#d8b673] hover:shadow-[0_0_30px_-8px_rgba(198,161,91,0.6)] disabled:opacity-50">
          {busy ? "…" : cta}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        {mode === "login" ? (
          <>New here? <Link to="/signup" className="text-gold hover:underline">Create an account</Link></>
        ) : (
          <button onClick={() => go("login")} className="text-gold hover:underline">← Back to log in</button>
        )}
      </p>
    </div>
  );
}
