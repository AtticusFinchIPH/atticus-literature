import { 
    GET_BESTSELLERS_REQUEST,
    GET_BESTSELLERS_SUCCESS,
    GET_BESTSELLERS_FAIL,
    GET_RECOMMENDED_REQUEST,
    GET_RECOMMENDED_SUCCESS,
    GET_RECOMMENDED_FAIL,
    GET_CART_REQUEST,
} from '../constants/productConstants';

const bestsellersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BESTSELLERS_REQUEST:
            return {...state, loading: true};
        case GET_BESTSELLERS_SUCCESS:
            return { loading: false, bestsellers: action.payload };
        case GET_BESTSELLERS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const recommendedsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_RECOMMENDED_REQUEST:
            return {...state, loading: true};
        case GET_RECOMMENDED_SUCCESS:
            return { loading: false, recommendeds: action.payload };
        case GET_RECOMMENDED_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART_REQUEST: 
            return { ...state, loading: true };
        default:
            return state;
    }
}

export { bestsellersReducer, recommendedsReducer, cartReducer }