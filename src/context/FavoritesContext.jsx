import { createContext, useContext, useEffect, useReducer } from "react";

const FavoritesContext = createContext(null);

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.some((item) => item.id === action.payload.id);
      return exists
        ? state.filter((item) => item.id !== action.payload.id)
        : [...state, action.payload];
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function getInitialFavorites() {
  try {
    return JSON.parse(localStorage.getItem("pokedex_favorites") || "[]");
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, getInitialFavorites);

  useEffect(() => {
    localStorage.setItem("pokedex_favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(pokemon) {
    dispatch({
      type: "TOGGLE",
      payload: {
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default ||
          "",
        types: pokemon.types?.map((item) => item.type.name) || [],
      },
    });
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites: () => dispatch({ type: "CLEAR" }) }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites debe utilizarse dentro de FavoritesProvider.");
  return context;
}
