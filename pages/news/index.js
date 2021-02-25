import * as R from 'ramda';

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

//Actions
import {newsActions} from "../../bus/news/actions";
// helpers
import { getNewsData} from '../../helpers';

// Selectors
import { selectNewsData } from '../../bus/news/selectors';
// Other
import { serverDispatch } from '../../helpers/serverDispatch';
import { disableSaga } from '../../helpers/disableSaga';

import Menu from '../../components/Menu';
import News from '../../components/News';

export const getServerSideProps = async (context) => {

    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    const news = await getNewsData();

    await serverDispatch(store, (dispatch) => {
        dispatch(newsActions.fillNews({news: news}));
    });

    await disableSaga(store);

    const currentPageReduxState = {
        news: {
            news: selectNewsData(store.getState()),
        },
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

const NewsPage = ({initialReduxState}) => {
    console.log('initialReduxState NewsPage ', initialReduxState);
    return (
            <>
                <Menu />
                <News />
            </>
    );
};

export default NewsPage;