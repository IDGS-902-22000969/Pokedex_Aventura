import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonByName, getPokemonPage } from "../services/pokemonService";
import "./Home.css";

const PAGE_SIZE = 20;

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPokemon() {
      setLoading(true);
      setError("");

      try {
        if (search.trim()) {
          const result = await getPokemonByName(search);
          if (!cancelled) {
            setPokemon([result]);
            setTotal(1);
          }
        } else {
          const result = await getPokemonPage(PAGE_SIZE, page * PAGE_SIZE);
          if (!cancelled) {
            setPokemon(result.pokemon);
            setTotal(result.count);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setPokemon([]);
          setTotal(0);
          setError(err.message || "No fue posible cargar los Pokémon.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPokemon();
    return () => { cancelled = true; };
  }, [search, page]);

  function handleSearch(event) {
    setSearch(event.target.value);
    setPage(0);
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">¡Tu aventura comienza aquí!</span>
          <h1>Conviértete en el mejor <span>entrenador Pokémon</span></h1>
          <p>Explora criaturas, descubre sus habilidades y crea tu propia colección.</p>
          <a className="button hero-button" href="#catalogo">Explorar Pokémon ↓</a>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-sun"></div>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" />
          <span className="spark spark-one">✦</span><span className="spark spark-two">✧</span>
        </div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Pokédex nacional</span>
            <h2>Descubre Pokémon</h2>
            <p>Busca por nombre o explora el catálogo.</p>
          </div>
          <label className="search-box">
            <span>⌕</span>
            <input value={search} onChange={handleSearch} placeholder="Ej. pikachu" aria-label="Buscar Pokémon por nombre" />
            {search && <button type="button" onClick={() => setSearch("")} aria-label="Limpiar búsqueda">×</button>}
          </label>
        </div>

        {loading ? (
          <div className="status-message"><span className="pokeball-loader">◉</span><p>Cargando Pokémon...</p></div>
        ) : error ? (
          <div className="status-message error-message"><p>{error}</p></div>
        ) : pokemon.length === 0 ? (
          <div className="status-message"><p>No hay Pokémon para mostrar.</p></div>
        ) : (
          <div className="pokemon-grid">
            {pokemon.map((item) => <PokemonCard key={item.id} pokemon={item} />)}
          </div>
        )}

        {!search.trim() && (
          <div className="pagination">
            <button className="button button-outline" disabled={page === 0 || loading} onClick={() => setPage((value) => value - 1)}>← Anterior</button>
            <span>Página {page + 1} de {Math.ceil(total / PAGE_SIZE)}</span>
            <button className="button" disabled={(page + 1) * PAGE_SIZE >= total || loading} onClick={() => setPage((value) => value + 1)}>Siguiente →</button>
          </div>
        )}
      </section>
    </>
  );
}
