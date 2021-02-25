import { types } from "./types";

const initialState = {
  entries: null,
};

export const asteroidsCopyReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_ASTEROIDS_COPY:
      return {...state, entries: payload};

    default:
      return state;
  };
};