import styles from './index.module.css';
import { format } from "date-fns";
import ButtonBack from '../ButtonBack';

const Article = ({item}) => {

    return (
        <>
            <ButtonBack />
            <div className={styles.item}>
                <p>News article - {item.id}</p>
                <p className={styles.text}>{item.content}</p>
                <p className={styles.time}>{format(item.dateOfReceiving, 'dd-MM-yyyy H:mm:ss ') }</p>
            </div>
        </>
    );
};

export default Article;