import { types } from "./types";

const initialState = {
    cars: []
};

export const carsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_CARS:
      return {...state, ...payload};

    default:
      return state;
  };
};