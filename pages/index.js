import * as R from 'ramda';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { asteroidsActions } from '../bus/asteroids/actions';
import { asteroidsCopyActions } from '../bus/asteroidsCopy/actions';
// Selectors
import { selectUserId, selectVisitCounts, selectUserType } from '../bus/user/selectors';
import { selectAsteroidsEntries } from '../bus/asteroids/selectors';
//Other
import { serverDispatch } from '../helpers/serverDispatch';
import { disableSaga } from '../helpers/disableSaga';
import { initializeStore } from '../init/store';
import { initApollo } from '../init/initApollo';
import { initialDispatcher } from '../init/initialDispatcher';
import queryPokemons from '../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql';
// Components
import Message from '../components/Message';
import Menu from '../components/Menu';
import Cats from '../components/Cats';
import { Asteroids } from '../bus/asteroids/asteroidsComponent';
import { AsteroidsCopy } from '../bus/asteroidsCopy/asteroidsComponent';
import { Pokemons } from '../bus/pokemons/pokemonsComponent';

export const getServerSideProps = async (context) => {
    console.log('getServerSideProps HOME');
    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    const initialApolloState = await initApollo(context, async (execute) => {
        await execute({
            query: queryPokemons,
        });
    });

    await serverDispatch(store, (dispatch) => {
        dispatch(asteroidsActions.loadAsteroidsAsync());
    });

    await disableSaga(store);

    const currentPageReduxState = {
        asteroids: {
            entries: selectAsteroidsEntries(store.getState()),
        },
        user: {
            userId: selectUserId(store.getState()),
            visitCounts: selectVisitCounts(store.getState()),
            userType: selectUserType(store.getState())
        },
    };

    const initialReduxState = R.mergeDeepRight(
        stateUpdates,
        currentPageReduxState
    );

    return {
        props: {
            initialReduxState,
            initialApolloState,
        }
    }
}

const Home = ({initialReduxState}) => {

    //console.log('initialReduxState home', initialReduxState);

    const dispatcher = useDispatch();
    const [loadCats, setLoadCats] = useState(false);

    const handleClick = () => {
        setLoadCats(true);
    };

    useEffect(() => {
        dispatcher(asteroidsCopyActions.loadAsteroidsCopyAsync());
    }, []);

    return (
        <>
            <Menu />
            <Message />
            {loadCats ? <Cats />
                    : <button onClick = {handleClick}>Load facts about cats</button>}
            <Asteroids />
            <Pokemons />
            <AsteroidsCopy />
        </>);
};

export default Home;