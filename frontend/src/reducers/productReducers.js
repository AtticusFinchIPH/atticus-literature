
import Cookie from 'js-cookie';
import BigNumber from 'bignumber.js';
import { 
    GET_BESTSELLERS_REQUEST,
    GET_BESTSELLERS_SUCCESS,
    GET_BESTSELLERS_FAIL,
    GET_RECOMMENDEDS_REQUEST,
    GET_RECOMMENDEDS_SUCCESS,
    GET_RECOMMENDEDS_FAIL,
    GET_CART_REQUEST,
    ADD_CART_LOCAL,
    ADD_CART_MULTI_LOCAL,
    UPDATE_CART_LOCAL,
    REMOVE_CART_LOCAL,
    SAVE_CART_SUCCESS,
    SAVE_CART_FAIL,
    VIEW_PRODUCT_REQUEST,
    VIEW_PRODUCT_SUCCESS,
    VIEW_PRODUCT_FAIL,
    VIEW_STORE_REQUEST,
    VIEW_STORE_SUCCESS,
    VIEW_STORE_FAIL,
    BOOK_GENRES_REQUEST,
    BOOK_GENRES_SUCCESS,
    BOOK_GENRES_FAIL,
} from '../constants/productConstants';

const bestsellersReducer = (state = {bestsellers: []}, action) => {
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

const recommendedsReducer = (state = {recommendeds: []}, action) => {
    switch (action.type) {
        case GET_RECOMMENDEDS_REQUEST:
            return {...state, loading: true};
        case GET_RECOMMENDEDS_SUCCESS:
            return { loading: false, recommendeds: action.payload };
        case GET_RECOMMENDEDS_FAIL:
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
                const quantity = new BigNumber(state.cartList[indexAdd].quantity).toNumber() + 1;
                state.cartList.splice(indexAdd, 1, {...action.payload.product, quantity});
            } else {
                state.cartList.push({...action.payload.product, quantity: 1});
            }
            Cookie.set('cartList', JSON.stringify(state.cartList));
            return { ...state, loading: false };
        case ADD_CART_MULTI_LOCAL:
            const indexAddMulti = state.cartList.findIndex(item => item._id === action.payload.product._id);
            console.log(indexAddMulti, action.payload.product)
            if(indexAddMulti > -1) {
                const quantityMulti = new BigNumber(state.cartList[indexAddMulti].quantity).toNumber() + new BigNumber(action.payload.product.quantity).toNumber();
                console.log(quantityMulti)
                state.cartList.splice(indexAddMulti, 1, {...action.payload.product, quantity: quantityMulti});
            } else {
                state.cartList.push({...action.payload.product, quantity: action.payload.product.quantity});
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

const viewingProductReducer = (state = {product: null}, action) => {
    switch (action.key) {
        case VIEW_PRODUCT_REQUEST:        
            return {...state, loading: true };
        case VIEW_PRODUCT_SUCCESS:        
            return { product: action.payload, loading: false };
        case VIEW_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const storeReducer = (state = { products: []}, action) => {
    switch (action.key) {
        case VIEW_STORE_REQUEST:
            return {...state, loading: true };
        case VIEW_STORE_SUCCESS:
            return { products: action.payload, loading: false };
        case VIEW_STORE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const bookGenresReducer = (state = { genres: []}, action) => {
    switch (action.key) {
        case BOOK_GENRES_REQUEST:
            return {...state, loading: true };
        case BOOK_GENRES_SUCCESS:
            return { genres: action.payload, loading: false };
        case BOOK_GENRES_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export { bestsellersReducer, recommendedsReducer, cartReducer, viewingProductReducer, storeReducer, bookGenresReducer }