import { types } from "./types";

export const asteroidsCopyActions = {
  fillAsteroidsCopy: (asteroids) => {
    return {
      type: types.FILL_ASTEROIDS_COPY,
      payload: asteroids,
    }
  },
  // Async
  loadAsteroidsCopyAsync: () => {
    return {
      type: types.LOAD_ASTEROIDS_ASYNC_COPY,
    }
  }
};
