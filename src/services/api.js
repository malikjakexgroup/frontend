// WordPress REST API (book-backend plugin). VITE_API_URL points at the WP site.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req(path, opts = {}) {
  const r = await fetch(`${BASE}/wp-json/books/v1${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(opts.headers || {}) },
  });
  const data = await r.json().catch(() => null);
  if (!r.ok) throw new Error((data && data.message) || `Request failed (${r.status})`);
  return data;
}

export const searchBooks = (q) => req(`/search?q=${encodeURIComponent(q)}`);
export const getBook = (id) => req(`/book/${encodeURIComponent(id)}`);

export const registerUser = (body) => req("/register", { method: "POST", body: JSON.stringify(body) });
export const loginUser = (body) => req("/login", { method: "POST", body: JSON.stringify(body) });
export const fetchMe = () => req("/me");

export const forgotPassword = (email) =>
  req("/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
export const verifyOtp = (email, otp) =>
  req("/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }) });
export const resetPassword = (email, otp, password) =>
  req("/reset-password", { method: "POST", body: JSON.stringify({ email, otp, password }) });
