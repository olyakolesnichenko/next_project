import { getUserType, getUserVisits } from '../helpers';

import {userActions} from "../bus/user/actions";

// Selectors
import { selectUserId, selectUserType, selectVisitCounts } from '../bus/user/selectors';

// Other
import { serverDispatch } from '../helpers/serverDispatch';

export const initialDispatcher = async (
  context,
  store
) => {

        const {visitCounts, userId} = await getUserVisits(context);
        const userType = getUserType(visitCounts);

        await serverDispatch(store, (dispatch) => {
            dispatch(userActions.fillUser(userId));
            dispatch(userActions.setVisitCounts(visitCounts));
            dispatch(userActions.setUserType(userType));

        });
        store.dispatch(userActions.fillUser({
            userId,
        }));
        store.dispatch(userActions.setVisitCounts({
            visitCounts,
        }));
        store.dispatch(userActions.setUserType({
            userType,
        }));

    const state = store.getState();

    const stateUpdates = {
        user: {
            userId: selectUserId(state),
            visitCounts: selectVisitCounts(state),
            userType: selectUserType(state)
        }
    };

    return {
        store,
        stateUpdates,
    };
}