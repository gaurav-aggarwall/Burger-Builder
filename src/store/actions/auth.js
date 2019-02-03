import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = error =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, pass) =>{
    return dispatch =>{
        dispatch(authStart());
        const authDataObj = {
            email: email, 
            password: pass,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBGbKcPzL7t2oIoeumdb5QIrHOo9VwArSo', authDataObj)
        .then( res => {
            console.log(res);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
};


export const login = (email, pass) =>{
    return dispatch =>{
        dispatch(authStart());
        const authDataObj = {
            email: email, 
            password: pass,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBGbKcPzL7t2oIoeumdb5QIrHOo9VwArSo', authDataObj)
        .then( res => {
            console.log(res);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkExpiryTime(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
};

export const checkExpiryTime = expTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expTime * 100);   
    }
}

export const logout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};