import { useRouter } from 'next/router'
import styles from './index.module.css';

const ButtonBack = () => {

    const router = useRouter()

    return <span className={styles.backButton} onClick={() => router.back()}>{"<<< GO BACK"}</span>
};

export default ButtonBack;