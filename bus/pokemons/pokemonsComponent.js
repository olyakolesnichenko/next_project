// Hooks
import { usePokemons } from './hooks/usePokemons';

export const Pokemons = () => {
  const { pokemons } = usePokemons();

  const pokemonsJSX = pokemons && pokemons.map(({ name }) => (
    <li key={name}>
      {name}
    </li>
  ));

  return (
    <>
      <h2>Pokemons</h2>
      {pokemonsJSX}
    </>
  )
}