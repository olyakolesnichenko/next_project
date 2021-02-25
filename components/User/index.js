import {useSelector, useDispatch} from 'react-redux';
import {userActions} from "../../bus/user/actions";
// Selectors
import { selectUserData } from '../../bus/user/selectors';

const User = () => {

    const dispatch = useDispatch();

    const user = useSelector(selectUserData);

    const upgradeUserType = () => {
        dispatch(userActions.setUserType({userType: (user.userType === "guest" ? "friend" : "familyMember")}));
    };
    return (
        <>
            <h1>User - {user.userId}</h1>
            <h2>Visits: {user.visitCounts}</h2>
            <h2>Type: {user.userType}</h2>

            {user.userType !== "familyMember" && <button type="button" onClick = {upgradeUserType}>Временно повысить свой статус</button>}
        </>
    );
};

export default User;