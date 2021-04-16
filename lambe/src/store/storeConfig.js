import { createStore, combineReducers } from 'redux'
import userReducer from './reduces/user'
import postsReducer from './reduces/posts'

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
});

const storeConfig = () => {
    return createStore(reducers);
}

export default storeConfig;