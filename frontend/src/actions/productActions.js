import axios from 'axios';
import {
    GET_BESTSELLERS_REQUEST,
    GET_BESTSELLERS_SUCCESS,
    GET_BESTSELLERS_FAIL,
    GET_RECOMMENDEDS_REQUEST,
    GET_RECOMMENDEDS_SUCCESS,
    GET_RECOMMENDEDS_FAIL,
    ADD_CART_LOCAL,
    UPDATE_CART_LOCAL,
    REMOVE_CART_LOCAL,
    ADD_CART_MULTI_LOCAL,
    BOOK_GENRES_REQUEST,
    BOOK_GENRES_SUCCESS,
    BOOK_GENRES_FAIL,
    VIEW_STORE_REQUEST,
    VIEW_STORE_SUCCESS,
    VIEW_STORE_FAIL,
    VIEW_PRODUCT_REQUEST,
    VIEW_PRODUCT_FAIL,
    VIEW_PRODUCT_SUCCESS,
} from '../constants/productConstants';

const getBestsellers = () => async (dispatch) => {
    dispatch({type: GET_BESTSELLERS_REQUEST});
    try {
        const {data} = await axios.get('/api/products/bestsellers');
        dispatch({ type: GET_BESTSELLERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_BESTSELLERS_FAIL, payload: error.response?.data?.msg || error.message });
    }
}

const getRecommendeds = () => async (dispatch) => {
    dispatch({type: GET_RECOMMENDEDS_REQUEST});
    try {
        const {data} = await axios.get('/api/products/recommendeds');
        dispatch({ type: GET_RECOMMENDEDS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_RECOMMENDEDS_FAIL, payload: error.response?.data?.msg || error.message });
    }
}

const getStore = ({keyword, genre, origin, skip}) => async (dispatch) => {
    dispatch({type: VIEW_STORE_REQUEST});
    try {
        const {data} = await axios.post('/api/products/bookstore', {
            keyword, genre, origin, skip
        });
        dispatch({ type: VIEW_STORE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEW_STORE_FAIL, payload: error.response?.data?.msg || error.message });
    }
}

const addToCart = (product) => async (dispatch, getState) => {
    dispatch({ type: ADD_CART_LOCAL, payload: {product} });
}

const addMultipleToCart = (product) => async (dispatch, getState) => {
    dispatch({ type: ADD_CART_MULTI_LOCAL, payload: {product} });
}

const updateLocalCart = (product) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_CART_LOCAL, payload: {product} });
}

const removeFromLocalCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_CART_LOCAL, payload: {productId} });
}

const getBookGenres = () => async (dispatch) => {
    dispatch({type: BOOK_GENRES_REQUEST});
    try {
        const {data} = await axios.get('/api/genres');
        dispatch({ type: BOOK_GENRES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BOOK_GENRES_FAIL, payload: error.response?.data?.msg || error.message });
    }
}

const getItemDetail = (productId) => async (dispatch) => {
    dispatch({ type: VIEW_PRODUCT_REQUEST });
    try {
        const {data} = await axios.get(`/api/products/item_detail/${productId}`);
        console.log(data)
        dispatch({ type: VIEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VIEW_PRODUCT_FAIL, payload: error.response?.data?.msg || error.message });
    }
}

export { getBestsellers, getRecommendeds, getStore, getItemDetail,
    addToCart, addMultipleToCart, updateLocalCart, removeFromLocalCart, 
    getBookGenres 
}