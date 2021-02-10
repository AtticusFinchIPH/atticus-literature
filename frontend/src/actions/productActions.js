import {
    ADD_CART_LOCAL,
    UPDATE_CART_LOCAL,
    REMOVE_CART_LOCAL,
    SAVE_CART_SUCCESS,
    SAVE_CART_FAIL,
} from '../constants/productConstants';

const addToCart = (product) => async (dispatch, getState) => {
    dispatch({ type: ADD_CART_LOCAL, payload: {product} });
}

const updateLocalCart = (product) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_CART_LOCAL, payload: {product} });
}

const removeFromLocalCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_CART_LOCAL, payload: {productId} });
}

export { addToCart, updateLocalCart, removeFromLocalCart }