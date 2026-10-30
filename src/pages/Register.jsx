import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirm) return setError("Las contraseñas no coinciden.");

    const result = register(name, email, password);
    if (!result.ok) return setError(result.message);
    navigate("/favoritos", { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-decoration register-decoration"><span>★</span><h2>¡Comienza tu colección!</h2><p>Crea tu perfil de entrenador y guarda tus Pokémon favoritos.</p></div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Nuevo entrenador</span>
        <h1>Crear cuenta</h1>
        <p>Completa tus datos para registrarte.</p>
        {error && <div className="form-error">{error}</div>}
        <label>Nombre<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required minLength={2} /></label>
        <label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required /></label>
        <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required minLength={6} /></label>
        <label>Confirmar contraseña<input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repite tu contraseña" required /></label>
        <button className="button auth-submit" type="submit">Crear mi cuenta</button>
        <div className="auth-switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></div>
      </form>
    </section>
  );
}
