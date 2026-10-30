const API_URL = "https://pokeapi.co/api/v2";

export async function getPokemonPage(limit = 20, offset = 0) {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error("No se pudo consultar PokéAPI.");
  const data = await response.json();

  const details = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      if (!detailResponse.ok) throw new Error("No se pudieron cargar algunos Pokémon.");
      return detailResponse.json();
    })
  );

  return { pokemon: details, count: data.count };
}

export async function getPokemonByName(name) {
  const response = await fetch(`${API_URL}/pokemon/${encodeURIComponent(name.toLowerCase().trim())}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("No encontramos ese Pokémon. Prueba con un nombre exacto.");
    throw new Error("Ocurrió un problema al consultar PokéAPI.");
  }
  return response.json();
}

export function getPokemonImage(pokemon) {
  return (
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    ""
  );
}

export function formatPokemonName(name = "") {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
