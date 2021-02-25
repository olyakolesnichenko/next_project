import { useSelector } from 'react-redux';
// Selectors
import { selectNewsData } from '../../bus/news/selectors';

import ListItem from '../ListItem';
import styles from './index.module.css';

const News = () => {

    const newsData = useSelector(selectNewsData);

    Object.entries(newsData).map( ([key, value]) => (
            value.dateOfReceiving = Date.now()
    ));

    return (
        <>
            <h2>News</h2>
            <div className={styles.news}>

                {Object.values(newsData).map(newsItem =>
                    <ListItem key={newsItem.id} {...newsItem}/>
                )}
            </div>
        </>
    );
};

export default News;