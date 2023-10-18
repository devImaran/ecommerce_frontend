import { combineReducers } from 'redux'
import Auth from './auth';

const rootReducer = combineReducers({
    user: Auth
});

export default rootReducer;