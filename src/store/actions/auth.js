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
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expDate', new Date(new Date().getTime() + res.data.expiresIn * 1000));
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
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expDate', new Date(new Date().getTime() + res.data.expiresIn * 1000));
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
        }, expTime * 1000);   
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expDate = new Date(localStorage.getItem('expDate'));

        if(token){
            if(expDate > new Date()){
                dispatch(authSuccess(token, userId));
                dispatch(checkExpiryTime((expDate.getTime() - new Date().getTime())/1000));
            }
            else{
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    };
}    

