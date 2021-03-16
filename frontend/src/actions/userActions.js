
import axios from '../utils/axiosInstance';
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_SIGNOUT,
    CLEAR_USER_SIGNIN_ERRORS,
    USER_ADD_FAVORITE_REQUEST,
    USER_ADD_FAVORITE_SUCCESS,
    USER_ADD_FAVORITE_FAIL,
    USER_REMOVE_FAVORITE_REQUEST,
    USER_REMOVE_FAVORITE_SUCCESS,
    USER_REMOVE_FAVORITE_FAIL, 
} from '../constants/userConstants';
import { ADD_NOTI, ERROR } from '../constants/globalConstants';

const authConfig = (userInfo) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    }
}

const signin = ({email, password}) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data: userInfo } = await axios.post("/api/users/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
        Cookie.set('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response?.data || error });
    }
}

const register = ({ firstName, lastName, email, password, rePassword }) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { firstName, lastName, email, password, rePassword } });
    try {
        const { data } = await axios.post("/api/users/register", { firstName, lastName, email, password, rePassword });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response?.data || error });
    }
}

const signout = () => (dispatch) => {
    dispatch({ type: USER_SIGNOUT });
}

const clearUserSigninErros = () => (dispatch) => {
    dispatch({ type: CLEAR_USER_SIGNIN_ERRORS });
}

const addToFavorites = (productId) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_ADD_FAVORITE_REQUEST });
    try {
        const { data } = await axios.post(`/api/users/add_favorite`,
            { productId },
            authConfig(userInfo),
        );
        dispatch({ type: USER_ADD_FAVORITE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_ADD_FAVORITE_FAIL });
        dispatch({
            type: ADD_NOTI, payload: {
                id: error.response?.data?.error,
                type: ERROR,
            }
        })
    }
}

const removeFromFavorites = (productId) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_REMOVE_FAVORITE_REQUEST });
    try {
        const { data } = await axios.post(`/api/users/remove_favorite`,
            { productId },
            authConfig(userInfo),
        );
        dispatch({ type: USER_REMOVE_FAVORITE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REMOVE_FAVORITE_FAIL });
        dispatch({
            type: ADD_NOTI, payload: {
                id: error.response?.data?.error,
                type: ERROR,
            }
        })
    }
}

export { signin, register, signout, clearUserSigninErros, addToFavorites, removeFromFavorites }