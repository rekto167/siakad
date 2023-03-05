import {USER_LOADED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, AUTH_ERROR} from "./type";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const login = (formData) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post('http://localhost:8000/api/login', formData);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    }catch (err){
        const errors = err.response.data.errors;

        if (errors){
            errors.forEach(err => dispatch(console.log(err.msg)));
        }

        dispatch({
            type:LOGIN_FAILED
        })
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('http://localhost:8000/api/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }catch (err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}