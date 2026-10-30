import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatPokemonName, getPokemonByName, getPokemonImage } from "../services/pokemonService";
import "./PokemonDetail.css";

export default function PokemonDetail() {
  const { name } = useParams();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDetail() {
      setLoading(true);
      setError("");
      try {
        const data = await getPokemonByName(name);
        if (!cancelled) setPokemon(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDetail();
    return () => { cancelled = true; };
  }, [name]);

  if (loading) return <div className="page-status">Cargando ficha Pokémon...</div>;
  if (error || !pokemon) return <div className="page-status">{error || "Pokémon no encontrado."} <Link to="/">Volver al inicio</Link></div>;

  const favorite = isFavorite(pokemon.id);
  const image = getPokemonImage(pokemon);

  return (
    <section className="detail-wrap">
      <Link className="back-link" to="/">← Volver a la Pokédex</Link>
      <article className="detail-card">
        <div className="detail-art">
          <span className="detail-number">N.º {String(pokemon.id).padStart(3, "0")}</span>
          <img src={image} alt={formatPokemonName(pokemon.name)} />
        </div>
        <div className="detail-info">
          <span className="eyebrow">Ficha de entrenador</span>
          <h1>{formatPokemonName(pokemon.name)}</h1>
          <div className="type-list detail-types">
            {pokemon.types.map(({ type }) => <span className={`type-pill type-${type.name}`} key={type.name}>{type.name}</span>)}
          </div>
          <p className="detail-description">¡Conoce sus características y agrégalo a tu colección de favoritos!</p>

          <div className="stat-grid">
            <div><small>Altura</small><b>{(pokemon.height / 10).toFixed(1)} m</b></div>
            <div><small>Peso</small><b>{(pokemon.weight / 10).toFixed(1)} kg</b></div>
            <div><small>Experiencia base</small><b>{pokemon.base_experience ?? "—"}</b></div>
          </div>

          <h3>Habilidades</h3>
          <div className="ability-list">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <span key={ability.name}>{formatPokemonName(ability.name)}{is_hidden ? " (oculta)" : ""}</span>
            ))}
          </div>

          <h3>Estadísticas base</h3>
          <div className="stats">
            {pokemon.stats.map(({ stat, base_stat }) => (
              <div className="stat-row" key={stat.name}>
                <span>{formatPokemonName(stat.name)}</span>
                <div className="stat-track"><div style={{ width: `${Math.min(base_stat, 150) / 150 * 100}%` }} /></div>
                <b>{base_stat}</b>
              </div>
            ))}
          </div>

          {user ? (
            <button className={`button favorite-button ${favorite ? "is-favorite" : ""}`} onClick={() => toggleFavorite(pokemon)}>
              {favorite ? "♥ Quitar de favoritos" : "♡ Agregar a favoritos"}
            </button>
          ) : (
            <p className="login-hint"><Link to="/login">Inicia sesión</Link> para guardar este Pokémon en favoritos.</p>
          )}
        </div>
      </article>
    </section>
  );
}
