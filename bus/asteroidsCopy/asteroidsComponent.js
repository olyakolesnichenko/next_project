// Core
import { useSelector } from 'react-redux';

// Selectors
import { selectAsteroidsCopyEntries } from './selectors';

export const AsteroidsCopy = () => {
  const entries = useSelector(selectAsteroidsCopyEntries);

  const entriesJSX = entries && entries.map(({ full_name }) => (
    <p key={full_name}>
      {full_name}
    </p>
  ));

  return (
    <>
      <h2>AsteroidsCopy</h2>
      {entriesJSX}
    </>
  )
}