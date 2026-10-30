import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span>Pokédex <b>Aventura</b></span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Explorar</NavLink>
        {user && <NavLink to="/favoritos">Mis favoritos</NavLink>}
      </nav>

      <div className="nav-user">
        {user ? (
          <>
            <span className="welcome-user">¡Hola, {user.name}!</span>
            <button className="button button-small button-outline" onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link className="nav-login" to="/login">Iniciar sesión</Link>
            <Link className="button button-small" to="/registro">Crear cuenta</Link>
          </>
        )}
      </div>
    </header>
  );
}
