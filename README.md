# Pokédex Aventura

Proyecto escolar en React con PokéAPI, React Router, Context, useReducer, useState, useEffect y localStorage.

## Requisitos
- Node.js 18 o superior
- npm

## Instalación
1. Descomprime el ZIP.
2. Abre una terminal en la carpeta `pokedex-aventura`.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev`.
5. Abre la URL local que indique Vite (normalmente http://localhost:5173).

Para comprobar la compilación de producción: `npm run build`.

## Funcionalidades
- Catálogo paginado de Pokémon (PokéAPI).
- Búsqueda por nombre exacto.
- Página de detalle con imagen, tipos, habilidades y estadísticas.
- Registro e inicio de sesión simulados.
- Favoritos guardados en localStorage.
- Ruta de favoritos protegida.
- Cierre de sesión.

## Nota de seguridad importante
La autenticación es únicamente una simulación didáctica del lado del navegador. Las contraseñas se guardan en localStorage sin cifrado; NO uses contraseñas reales ni este mecanismo en producción. Una aplicación real necesita backend, almacenamiento seguro de contraseñas (hash con salt), validación del servidor y sesiones/tokens seguros.

## Requisitos de la materia
- Plantilla/estructura: carpetas `components`, `context`, `pages`, `reducers`, `services`, `styles`.
- Estilos individuales: cada componente/página importa su propio CSS.
- Estilos globales: `src/styles/global.css`.
- Fragment: se usa `<>...</>` en componentes.
- useState: búsqueda, página, formularios, carga y errores.
- useEffect: peticiones a PokéAPI y sincronización inicial.
- asyncEffect: no existe como hook oficial; se implementa una función `async` dentro de `useEffect` (ver `Home.jsx` y `PokemonDetail.jsx`).
- localStorage: persistencia de sesión, usuarios demo y favoritos.
- React Router: `BrowserRouter`, `Routes`, `Route`, `Navigate`.
- Link y NavLink: navegación de tarjetas y menú.
- Auth Reducer: `src/reducers/authReducer.js`.
- Context y useReducer: `AuthContext` y `FavoritesContext`.
