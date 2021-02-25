import { useSelector } from 'react-redux';
// Selectors
import { selectCarsData } from '../../bus/cars/selectors';

import ListItem from '../ListItem';
import styles from './index.module.css';

const Cars = () => {

    const carsData = useSelector(selectCarsData);

    Object.entries(carsData).map( ([key, value]) => (
        value.dateOfReceiving = Date.now()
    ));

    return (
        <>
            <h2>Cars</h2>
                <div className={styles.cars}>
                    {Object.values(carsData).map(car =>
                        <ListItem key={car.id} {...car}/>
                    )}
                </div>
        </>
    );
};

export default Cars;