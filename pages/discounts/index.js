import * as R from 'ramda';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from "next/router";

import {initializeStore} from '../../init/store';
import {initialDispatcher} from '../../init/initialDispatcher';
//Actions
import {discountsActions} from "../../bus/discounts/actions";
// Selectors
import { selectDiscountsData } from '../../bus/discounts/selectors';
import { selectUserType } from '../../bus/user/selectors';
//helpers
import {getDiscountsData} from '../../helpers';
import {verifyBrowser} from "../../helpers/verifyBrowser";
import {pageVerify} from "../../helpers/pageVerify";
// Other
import { serverDispatch } from '../../helpers/serverDispatch';
import { disableSaga } from '../../helpers/disableSaga';

import Menu from '../../components/Menu';
import Discounts from '../../components/Discounts';

export const getServerSideProps = async (context) => {

    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    const prevState = store.getState();

    const isBrowser = verifyBrowser();

    if (!isBrowser && pageVerify(context.resolvedUrl, prevState.user.userType)) {
        context.res.writeHead(301, { Location: '/' });
        context.res.end();
        return { props: {} };
    }

    const discounts = await getDiscountsData();

    await serverDispatch(store, (dispatch) => {
        dispatch(discountsActions.fillDiscounts({discounts: discounts}));
    });

    await disableSaga(store);

    const currentPageReduxState = {
        discounts: {
            discounts: selectDiscountsData(store.getState()),
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

const DiscountsPage = ({initialReduxState}) => {
    console.log('initialReduxState DiscountsPage ', initialReduxState);

    const {pathname, replace} = useRouter();
    const userType = useSelector(selectUserType);

    useEffect(() => {
        if (pageVerify(pathname, userType)) {
            replace('/');
        }
    }, []);

    return (
        <>
            <Menu />
            <Discounts />
        </>
    );
};

export default DiscountsPage;