// Core
import { useSelector } from 'react-redux';

// Selectors
import { selectAsteroidsEntries } from './selectors';
// Styles
import styles from './styles.module.scss';

export const Asteroids = () => {
  const entries = useSelector(selectAsteroidsEntries);

  const entriesJSX = entries && entries.map(({ full_name }) => (
    <p key={full_name}>
      {full_name}
    </p>
  ));

  return (
    <div className={styles.asteroidsWrapper}>
      <h2>Asteroids</h2>
      <div className={styles.asteroids}>
        {entriesJSX}
      </div>
    </div>
  )
}