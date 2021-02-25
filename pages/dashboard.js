import * as R from 'ramda';

import { initializeStore } from '../init/store';
import { initialDispatcher } from '../init/initialDispatcher';
import {useDispatch, useSelector} from 'react-redux';
//import {userActions} from "../bus/user/actions";
import {newsActions} from "../bus/news/actions";
import {discountsActions} from "../bus/discounts/actions";
import {carsActions} from "../bus/cars/actions";

import { getDashboardData } from '../helpers';
import Link from 'next/link';
import Menu from '../components/Menu';

// Selectors
import { selectNewsData } from '../bus/news/selectors';
import { selectDiscountsData } from '../bus/discounts/selectors';
import { selectCarsData } from '../bus/cars/selectors';
// Other
import { serverDispatch } from '../helpers/serverDispatch';
import { disableSaga } from '../helpers/disableSaga';

export const getServerSideProps = async (context) => {
    console.log('getServerSideProps DASHBOARD');
    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    let dashboardData = await getDashboardData();

    await serverDispatch(store, (dispatch) => {
        dispatch(newsActions.fillNews({news: dashboardData.news}));
        dispatch(discountsActions.fillDiscounts({discounts: dashboardData.discounts}));
        dispatch(carsActions.fillCars({cars: dashboardData.cars}));
    });

    await disableSaga(store);

    const currentPageReduxState = {
        news: {
            news: selectNewsData(store.getState())
        },
        discounts: {
            discounts: selectDiscountsData(store.getState())
        },
        cars: {
            cars: selectCarsData(store.getState()),
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

const Dashboard = ({initialReduxState}) => {

    //const initVisits = initialReduxState.user.visitCounts;

    //console.log('initialReduxState', initialReduxState);

    const news = useSelector(selectNewsData);
    const discounts = useSelector(selectDiscountsData);
    const cars = useSelector(selectCarsData);

    let dashboardData = { news: news, discounts: discounts, cars: cars };

    const getLinks = (category) => {
        return (
            <div>
                <p>
                    <Link href={`/${category}`}>
                        <a className="link category">{`All ${category}`}</a>
                    </Link>
                </p>
                {Object.entries(dashboardData[category]).map( ([key, value]) => (
                    <p key={value.id}>
                        <Link href= {`/${category}/${encodeURIComponent(value.id)}`}>
                            <a className="link">{value.content}</a>
                        </Link>
                    </p>
                ))}
            </div>
        );
    };
    //console.log('initialReduxState Dashboard', initialReduxState);
    return (
        <>
            <Menu/>
            <h1>Dashboard</h1>
            <div>
                {dashboardData.news && getLinks('news')}
                { dashboardData.discounts && getLinks('discounts')}
                { dashboardData.cars && getLinks('cars')}
            </div>
        </>
    );
};

export default Dashboard;