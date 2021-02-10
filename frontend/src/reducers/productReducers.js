
import Cookie from 'js-cookie';
import { 
    GET_BESTSELLERS_REQUEST,
    GET_BESTSELLERS_SUCCESS,
    GET_BESTSELLERS_FAIL,
    GET_RECOMMENDED_REQUEST,
    GET_RECOMMENDED_SUCCESS,
    GET_RECOMMENDED_FAIL,
    GET_CART_REQUEST,
    ADD_CART_LOCAL,
    UPDATE_CART_LOCAL,
    REMOVE_CART_LOCAL,
    SAVE_CART_SUCCESS,
    SAVE_CART_FAIL,
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

const cartReducer = (state = { cartList: Cookie.getJSON('cartList') || [] }, action) => {
    switch (action.type) {
        case GET_CART_REQUEST: 
            return { ...state, loading: true };
        case ADD_CART_LOCAL:
            const indexAdd = state.cartList.findIndex(item => item._id === action.payload.product._id);
            if(indexAdd > -1) {
                const quantity = state.cartList[indexAdd].quantity + 1;
                state.cartList.splice(indexAdd, 1, {...action.payload.product, quantity});
            } else {
                state.cartList.push({...action.payload.product, quantity: 1});
            }
            Cookie.set('cartList', JSON.stringify(state.cartList));
            return { ...state, loading: false };
        case UPDATE_CART_LOCAL:
            const indexUpdate = state.cartList.findIndex(item => item._id === action.payload.product._id);
            state.cartList.splice(indexUpdate, 1, action.payload.product);
            Cookie.set('cartList', JSON.stringify(state.cartList));
            return { ...state, loading: false };
        case REMOVE_CART_LOCAL:
            const indexRemove = state.cartList.findIndex(item => item._id === action.payload.productId);
            state.cartList.splice(indexRemove, 1);
            Cookie.set('cartList', JSON.stringify(state.cartList));
            return { ...state, loading: false };
        case SAVE_CART_SUCCESS:
            return { ...state, loading: false };
        case SAVE_CART_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}

export { bestsellersReducer, recommendedsReducer, cartReducer }