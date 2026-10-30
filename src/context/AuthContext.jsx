import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer, initialAuthState } from "../reducers/authReducer";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("pokedex_session", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("pokedex_session");
    }
  }, [state.user]);

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("pokedex_users") || "[]");
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return { ok: false, message: "Ya existe una cuenta con ese correo." };
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password, // Solo se almacena en localStorage
    };

    localStorage.setItem("pokedex_users", JSON.stringify([...users, newUser]));
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    dispatch({ type: "LOGIN", payload: sessionUser });
    return { ok: true };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("pokedex_users") || "[]");
    const user = users.find(
      (item) => item.email === email.trim().toLowerCase() && item.password === password
    );

    if (!user) return { ok: false, message: "Correo o contraseña incorrectos." };

    dispatch({
      type: "LOGIN",
      payload: { id: user.id, name: user.name, email: user.email },
    });
    return { ok: true };
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  return context;
}
