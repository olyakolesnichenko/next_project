import {useSelector} from 'react-redux';

// Selectors
import { selectUserData } from '../../bus/user/selectors';

const Message = () => {

    const user = useSelector(selectUserData);

    const welcomeMsg = user.userType === "familyMember" ? "Добро пожаловать в семье!" :
        (user.userType === "friend" ? "Приветствуем тебя друг!" : "Приветствуем тебя странник!");

    return (
        <>
            <h1>{welcomeMsg}</h1>
        </>
    );
};

export default Message;