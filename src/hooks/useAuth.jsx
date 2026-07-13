import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, fetchMe, resetPassword } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // On load, if we have a saved token, ask WordPress who we are.
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setReady(true);
      return;
    }
    fetchMe()
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setReady(true));
  }, []);

  async function apply(promise) {
    const { token, user: u } = await promise;
    localStorage.setItem("token", token);
    setUser(u);
  }

  const login = (email, password) => apply(loginUser({ email, password }));
  const register = (name, email, password) => apply(registerUser({ name, email, password }));
  const reset = (email, otp, password) => apply(resetPassword(email, otp, password));
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, register, reset, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
