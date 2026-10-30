export const initialAuthState = {
  user: JSON.parse(localStorage.getItem("pokedex_session") || "null"),
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}
