import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOAD } from './actionTypes'
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = 'AIzaSyBI83K2us9jZa4IPNoNJNB9Pkyj4DY6odc';

export const userLogged = user => {
    return  {
        type: USER_LOGGED_IN,
        payload: user,
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = user => {
    return dispatch => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        }).catch(err => console.log(err))
            .then(res => {
                if (res.data.localId) {
                    axios.put(`users/${res.data.localId}.json`, {
                        name: user.name
                    }).catch(err => console.log(err))
                    .then(res => {
                        console.log(res.data);
                    })
                 }
        });
    }
}

export const loadingUser = () => {
    return  {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return  {
        type: USER_LOAD
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser());
        console.log(user)
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        }).catch(err => console.log(err))
        .then(res => {
            if (res.data.localId) {
                axios.get(`/users/${res.data.localId}.json`)
                    .catch(err => console.log(err))
                    .then(resp => {
                        user.password = null;
                        user.name = resp.data.name;
                        dispatch(userLogged(user));
                        dispatch(userLoaded());
                    })
            }
        });
    }
}