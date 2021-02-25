import * as R from 'ramda';

import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';

import User from '../components/User';
import Menu from '../components/Menu';

export const getServerSideProps = async (context) => {
    console.log('getServerSideProps USER');

    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    const currentPageReduxState = {

    };

    const initialReduxState = R.mergeDeepRight(
        stateUpdates,
        currentPageReduxState
    );
    return {
        props: {
            initialReduxState
        }
    }
}

const UserPage = ({initialReduxState}) => {

    //console.log('initialReduxState UserPage ', initialReduxState);
    return (
        <>
            <Menu />
            <User />
        </>
    );
};

export default UserPage;