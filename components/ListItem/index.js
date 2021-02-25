import styles from './index.module.css';
import { format } from "date-fns";

const ListItem = (props) => {

    return (
            <div className={styles.item}>
                <p className={styles.text}>{props.content}</p>
                <p className={styles.time}>{format(props.dateOfReceiving, 'dd-MM-yyyy H:mm:ss ') }</p>
            </div>
    );
};

export default ListItem;