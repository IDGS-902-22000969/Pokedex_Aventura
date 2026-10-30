import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.ok) return setError(result.message);
    navigate(location.state?.from?.pathname || "/favoritos", { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-decoration"><span>⚡</span><h2>¡Vuelve a tu aventura!</h2><p>Tu próxima captura te está esperando.</p></div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Entrenador Pokémon</span>
        <h1>Iniciar sesión</h1>
        <p>Ingresa a tu cuenta para ver tu colección.</p>
        {error && <div className="form-error">{error}</div>}
        <label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required /></label>
        <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" required /></label>
        <button className="button auth-submit" type="submit">Entrar a mi cuenta</button>
        <div className="auth-switch">¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link></div>  
      </form>
    </section>
  );
}
