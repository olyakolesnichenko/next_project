import { useSelector } from 'react-redux';
// Selectors
import { selectDiscountsData } from '../../bus/discounts/selectors';

import ListItem from '../ListItem';
import styles from './index.module.css';

const Discounts = () => {

    const discountsData = useSelector(selectDiscountsData);

    Object.entries(discountsData).map( ([key, value]) => (
        value.dateOfReceiving = Date.now()
    ));

    return (
        <>
            <h2>Discounts</h2>
            <div className={styles.discounts}>
                {Object.values(discountsData).map(discount =>
                    <ListItem key={discount.id} {...discount}/>
                )}
            </div>
        </>
    );
};

export default Discounts;