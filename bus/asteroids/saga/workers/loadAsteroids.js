// Core
import { put, call, delay } from 'redux-saga/effects';

// Instruments
import { asteroidsActions } from '../../actions';
import { verifyEnvironment } from "../../../../helpers/verifyEnvironment";
import { developmentLogger } from "../../../../helpers/logger";

export function* loadAsteroids () {
  const { isDevelopment } = verifyEnvironment();
  const url = 'http://www.asterank.com/api/asterank?query=%7B%22e%22:%7B%22$lt%22:0.1%7D,%22i%22:%7B%22$lt%22:4%7D,%22a%22:%7B%22$lt%22:1.5%7D%7D&limit=10';
  let status = null;

  try {
    if (isDevelopment) {
      developmentLogger.info(`API GET request to ${url} was started...`);
    }
    const response = yield call(fetch, url);
    status = response.status;
    const results = yield call([response, response.json]);

    if (status !== 200 && isDevelopment) {
       developmentLogger.warn({
           message: `Current status code is: ${status}`
       });
    }

    yield put(asteroidsActions.fillAsteroids(results));
  } catch (error) {
      if (isDevelopment) {
          developmentLogger.warn({
              message: `Current status code is: ${status}`
          });
      }
      console.log('loadAsteroidsAsync', error);
  } finally {
      if (isDevelopment) {
          developmentLogger.info(`API GET request to ${url} was finished with status ${status}`);
      }
  }
}

