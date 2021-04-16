import { 
    createStore, 
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import userReducer from './reduces/user'
import postsReducer from './reduces/posts'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
});

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;