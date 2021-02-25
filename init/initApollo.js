// Other
import { initializeApollo } from './apollo';
import { verifyBrowser } from "../helpers/verifyBrowser";
import { verifyEnvironment } from "../helpers/verifyEnvironment";
import { serverGraphqlInformationLogger } from "../helpers/serverGraphqlInformationLogger";
import { clientGraphqlInformationLogger } from "../helpers/clientGraphqlInformationLogger";
import { serverGraphqlErrorLogger } from '../helpers/serverGraphqlErrorLogger';

export const initApollo = async (context, executor) => {
  const isBrowser = verifyBrowser();
  const { isDevelopment, isProduction } = verifyEnvironment();
  try {
    const apolloClient = initializeApollo({}, context);

    const userAgent = context.req.headers['user-agent'];

    const execute = async (query) => {
      if (isDevelopment) {
          serverGraphqlInformationLogger(query, {
              isStarted: true,
          });
      } else {
          if (isBrowser){
              clientGraphqlInformationLogger(query, 'graphql started')
          }
      }
      try {
        const queryResult = await apolloClient.query({
          ...query,
          context: {
            headers: {
              'user-agent': userAgent,
            },
          },
        });

        return queryResult;
      } catch (err) {
        serverGraphqlErrorLogger(query, err, context);
        if (isProduction && isBrowser){
            console.log(`GraphQL req error: ${err.message}`);
            clientGraphqlInformationLogger(query, `GraphQL req error: ${err.message}`);
        }
        return undefined;
      } finally {
        if (isDevelopment) {
            serverGraphqlInformationLogger(query, {
                isFinished: true,
            });
        } else {
            if (isBrowser){
                clientGraphqlInformationLogger(query, "graphql req finished");
            }
        }
      }
    };

    await executor(execute);

    return apolloClient.cache.extract();
  } catch (err) {
    console.log('SOME ERROR', err.message);
    return {}
  }
}