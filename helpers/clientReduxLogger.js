// Other
import { createClientProductionLog } from "./createClientProductionLog";

export const clientReduxLogger = store => next => action => {
    createClientProductionLog('rest', `Redux Dispatch: ${action.type}`);

  next(action);
};
