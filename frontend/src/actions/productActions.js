import {
    ADD_CART_REQUEST,
    ADD_CART_SUCCESS,
    ADD_CART_FAIL,
} from '../constants/productConstants';

const addToCart = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_CART_REQUEST, payload: {product} });
    } catch (error) {
        dispatch({ type: ADD_CART_FAIL, payload:  error.response?.data?.msg || error.message });
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
        
    } catch (error) {
        
    }
}

const updateCart = (product, quantity) => async (dispatch, getState) => {
    try {
        
    } catch (error) {
        
    }
}

export { addToCart, removeFromCart, updateCart }