
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST, CLEAR_USER_SIGNIN_ERRORS,
    USER_SIGNOUT,
} from '../constants/userConstants';

const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, errors: action.payload };
        case USER_SIGNOUT:
            Cookie.remove("userInfo");
            return {};
        case CLEAR_USER_SIGNIN_ERRORS:
            return {...state, erros: null };
        default: return state;
    }
}

export { userSigninReducer };