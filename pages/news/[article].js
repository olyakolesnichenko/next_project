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
import Article from '../../components/Article';

export const getServerSideProps = async (context) => {

    const articleId = context.query.article;
    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    const news = await getNewsData();

    const newsItemData = news.filter((item) => (item.id === articleId))[0];

    if (!newsItemData){
        return {
            // return default 404 page
            notFound: true
        }
    }

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
            initialReduxState,
            newsItemData
        }
    }
}

const ArticlePage = ({initialReduxState, newsItemData}) => {

        console.log('initialReduxState ArticlePage ', initialReduxState);

        newsItemData.dateOfReceiving = Date.now();

        return (
            <>
                <Menu />
                <Article item={newsItemData}/>
            </>
    );
};

export default ArticlePage;