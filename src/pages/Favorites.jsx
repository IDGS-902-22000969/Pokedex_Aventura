import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { formatPokemonName } from "../services/pokemonService";
import "./Favorites.css";

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <section className="favorites-page">
      <div className="favorites-heading">
        <div><span className="eyebrow">Tu colección personal</span><h1>Mis Pokémon favoritos</h1><p>Tu equipo especial, reunido en un solo lugar.</p></div>
        {favorites.length > 0 && <button className="button button-outline" onClick={clearFavorites}>Vaciar colección</button>}
      </div>
      {favorites.length === 0 ? (
        <div className="empty-favorites"><div>♡</div><h2>Aún no tienes favoritos</h2><p>Explora la Pokédex y guarda los Pokémon que más te gusten.</p><Link className="button" to="/">Explorar Pokémon</Link></div>
      ) : (
        <div className="favorite-grid">
          {favorites.map((pokemon) => (
            <Link className="favorite-item" to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <img src={pokemon.image} alt={formatPokemonName(pokemon.name)} />
              <div><b>{formatPokemonName(pokemon.name)}</b><small>N.º {String(pokemon.id).padStart(3, "0")}</small></div>
              <span>→</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
