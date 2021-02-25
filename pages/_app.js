import '../styles/globals.css';
// Core
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

// Other
import {useStore} from '../init/store';
import { useApollo } from '../init/apollo';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);

    console.log('APP js-------------------------');
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component theme='default' {...pageProps} />
        </ApolloProvider>
      </Provider>
    );
}

export default MyApp
