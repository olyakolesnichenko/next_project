import * as R from 'ramda';

import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from "next/router";

import { initializeStore } from '../../init/store';
import { initialDispatcher } from '../../init/initialDispatcher';

//Actions
import {carsActions} from "../../bus/cars/actions";
// Selectors
import { selectCarsData } from '../../bus/cars/selectors';
import { selectUserType } from '../../bus/user/selectors';
//helpers
import { getCarsData} from '../../helpers';
import {verifyBrowser} from "../../helpers/verifyBrowser";
import {pageVerify} from "../../helpers/pageVerify";
// Other
import { serverDispatch } from '../../helpers/serverDispatch';
import { disableSaga } from '../../helpers/disableSaga';
import Menu from '../../components/Menu';
import CarItem from '../../components/CarItem';

export const getServerSideProps = async (context) => {

    const { store, stateUpdates } = await initialDispatcher(context, initializeStore());

    const prevState = store.getState();

    const isBrowser = verifyBrowser();

    if (!isBrowser && pageVerify(context.resolvedUrl, prevState.user.userType)) {
        context.res.writeHead(301, { Location: '/' });
        context.res.end();
        return { props: {} };
    }

    const carId = context.query.car;

    const cars = await getCarsData();

    const carItemData = cars.filter((item) => (item.id === carId))[0];

    if (!carItemData){
        return {
            // return default 404 page
            notFound: true
        }
    }

    await serverDispatch(store, (dispatch) => {
        dispatch(carsActions.fillCars({cars: cars}));
    });

    await disableSaga(store);

    const currentPageReduxState = {
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
            initialReduxState,
            carItemData
        }
    }
}

const CarItemPage = ({initialReduxState, carItemData}) => {
    console.log('initialReduxState CarItemPage ', initialReduxState);

    const { pathname, replace } = useRouter();
    const userType = useSelector(selectUserType);

    carItemData.dateOfReceiving = Date.now();

    useEffect(() => {
        if (pageVerify(pathname, userType)) {
            replace('/');
        }
    }, []);

    return (
        <>
            <Menu />
            <CarItem item={carItemData}/>
        </>
    );
};

export default CarItemPage;