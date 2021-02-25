// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { loadAsteroidsCopy } from './workers/loadAsteroidsCopy';

function* watchLoadAsteroidsCopy () {
  yield takeEvery(types.LOAD_ASTEROIDS_ASYNC_COPY, loadAsteroidsCopy);
}

export function* watchAsteroidsCopy () {
  yield all([call(watchLoadAsteroidsCopy)]);
}