
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST, CLEAR_USER_SIGNIN_ERRORS,
    USER_SIGNOUT,
    USER_ADD_FAVORITE_REQUEST,
    USER_REMOVE_FAVORITE_REQUEST,
    USER_ADD_FAVORITE_SUCCESS,
    USER_REMOVE_FAVORITE_SUCCESS,
    USER_ADD_FAVORITE_FAIL,
    USER_REMOVE_FAVORITE_FAIL,
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
            return {...state, errors: null };

        case USER_ADD_FAVORITE_REQUEST:
        case USER_REMOVE_FAVORITE_REQUEST:
            return {...state, favoritesLoading: true};
        case USER_ADD_FAVORITE_SUCCESS:
        case USER_REMOVE_FAVORITE_SUCCESS:
            return { userInfo: action.payload };
        case USER_ADD_FAVORITE_FAIL:
        case USER_REMOVE_FAVORITE_FAIL:
            return {...state, favoritesLoading: false};
        default: return state;
    }
}

export { userSigninReducer };