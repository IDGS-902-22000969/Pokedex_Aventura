import { Link } from "react-router-dom";
import { formatPokemonName, getPokemonImage } from "../services/pokemonService";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
  const image = getPokemonImage(pokemon);
  return (
    <Link className="pokemon-card" to={`/pokemon/${pokemon.name}`}>
      <span className="pokemon-number">N.º {String(pokemon.id).padStart(3, "0")}</span>
      <div className="pokemon-art">
        {image ? <img src={image} alt={formatPokemonName(pokemon.name)} loading="lazy" /> : <span>?</span>}
      </div>
      <h3>{formatPokemonName(pokemon.name)}</h3>
      <div className="type-list">
        {pokemon.types.map(({ type }) => (
          <span className={`type-pill type-${type.name}`} key={type.name}>{type.name}</span>
        ))}
      </div>
      <span className="card-more">Ver información →</span>
    </Link>
  );
}
