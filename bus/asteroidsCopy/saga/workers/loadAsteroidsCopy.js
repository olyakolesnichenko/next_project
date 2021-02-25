// Core
import { put, call } from 'redux-saga/effects';

// Instruments
import { asteroidsCopyActions } from '../../actions';
import { verifyBrowser } from "../../../../helpers/verifyBrowser";
import { verifyEnvironment } from "../../../../helpers/verifyEnvironment";
import { developmentLogger } from "../../../../helpers/logger";
import { createClientProductionLog } from "../../../../helpers/createClientProductionLog";

export function* loadAsteroidsCopy () {
  const { isDevelopment } = verifyEnvironment();
    const isBrowser = verifyBrowser();
  const url = 'http://www.asterank.com/api/asterank?query=%7B%22e%22:%7B%22$lt%22:0.1%7D,%22i%22:%7B%22$lt%22:4%7D,%22a%22:%7B%22$lt%22:1.5%7D%7D&limit=5';
  let status = null;

  try {
    if (isDevelopment) {
      developmentLogger.info(`API GET request to ${url} was started...`);
    } else {
        if (isBrowser) {
            yield createClientProductionLog('rest', `API GET request to ${url} was started...`);
        }
    }
    const response = yield call(fetch, url);

    status = response.status;
    const results = yield call([response, response.json]);

    if (status !== 200 ) {
        if (isDevelopment) {
            developmentLogger.warn({
                message: `Current status code is: ${status}`
            });
        } else {
            if (isBrowser) {
                yield createClientProductionLog('rest', `Current status code is: ${status}`);
            }
        }
    }

    yield put(asteroidsCopyActions.fillAsteroidsCopy(results));
  } catch (error) {
      if (isDevelopment) {
          developmentLogger.warn({
              message: `Current status code is: ${status}`
          });
      } else {
          if (isBrowser) {
              yield createClientProductionLog('rest', `Current status code is: ${status}`);
          }
      }
      console.log('loadAsteroidsAsync', error);
  } finally {
      if (isDevelopment) {
          developmentLogger.info(`API GET request to ${url} was finished with status ${status}`);
      } else {
          if (isBrowser) {
              yield createClientProductionLog('rest', `API GET request to ${url} was finished with status ${status}`);
          }
      }
  }
}

