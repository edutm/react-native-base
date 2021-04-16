import { createStore, combineReducers } from 'redux'
import userReducer from './reduces/user'

const reducers = combineReducers({
    user: userReducer,
});

const storeConfig = () => {
    return createStore(reducers);
}

export default storeConfig;