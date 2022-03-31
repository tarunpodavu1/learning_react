import { combineReducers } from 'redux';

import { authentication } from './authentication/authentication.reducer';
import { registration } from './registration/registration.reducer';
import { users } from './user/users.reducer';
import { alert } from './alert/alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert
});

export default rootReducer;