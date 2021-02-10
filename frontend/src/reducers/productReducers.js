import { 
    GET_BESTSELLERS_REQUEST,
    GET_BESTSELLERS_SUCCESS,
    GET_BESTSELLERS_FAIL,
    GET_RECOMMENDED_REQUEST,
    GET_RECOMMENDED_SUCCESS,
    GET_RECOMMENDED_FAIL,
    GET_CART_REQUEST,
    ADD_CART_REQUEST,
    ADD_CART_SUCCESS,
    ADD_CART_FAIL,
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

const cartReducer = (state = { cartList: [] }, action) => {
    switch (action.type) {
        case GET_CART_REQUEST: 
            return { ...state, loading: true };
        case ADD_CART_REQUEST:
            console.log(action.payload)
            const { product } = action.payload;
            const index = state.cartList.findIndex(item => item._id === product._id);
            console.log(index)
            if(index > -1) {
                const quantity = state.cartList[index].quantity + 1;
                console.log(quantity)
                state.cartList.splice(index, 1, {...product, quantity});
            } else {
                state.cartList.push({...product, quantity: 1});
            }
            return { ...state, loading: true };
        case ADD_CART_SUCCESS:
            return { ...state, loading: false };
        case ADD_CART_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}

export { bestsellersReducer, recommendedsReducer, cartReducer }