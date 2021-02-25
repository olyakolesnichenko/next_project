import Link from 'next/link';
import styles from './index.module.css';
import ActiveLink from '../ActiveLink';

const Menu = () => {

    return (
        <ul className={styles.menu}>
            <li>
                <ActiveLink activeClassName={styles.active} href="/">
                    <a>Main page</a>
                </ActiveLink>
            </li>
            <li>
                <ActiveLink activeClassName={styles.active} href="/dashboard">
                    <a>Dashboard</a>
                </ActiveLink>
            </li>
            <li>
                <ActiveLink activeClassName={styles.active} href="/user">
                    <a>User page</a>
                </ActiveLink>
            </li>
        </ul>
    );
};

export default Menu;