
import axios from '../utils/axiosInstance';
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_SIGNOUT,
    CLEAR_USER_SIGNIN_ERRORS, 
} from '../constants/userConstants';

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
        const { data } = await axios.post("/api/users/signin", { email, password });
        const { _id, firstName, lastName, nickName, isAdmin, email: userEmail, token, } = data;
        const userInfo = { _id, firstName, lastName, nickName, isAdmin, userEmail, token, };
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

export { signin, register, signout, clearUserSigninErros }