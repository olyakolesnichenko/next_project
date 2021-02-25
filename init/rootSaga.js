// Core
import { all } from 'redux-saga/effects';

// Workers
import { watchAsteroids } from '../bus/asteroids/saga/watchers';
import { watchAsteroidsCopy } from '../bus/asteroidsCopy/saga/watchers';

export function* rootSaga() {
  yield all([ watchAsteroids(), watchAsteroidsCopy() ]);
};
