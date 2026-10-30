import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>404</div>
      <h1>¡Te perdiste, entrenador!</h1>
      <p>Esta ruta no existe en nuestra Pokédex.</p>
      <Link className="button" to="/">Volver al inicio</Link>
    </section>
  );
}
