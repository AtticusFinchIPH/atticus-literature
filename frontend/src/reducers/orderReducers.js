import {
    SHIPPING_FEE_CHANGE, SHIPPING_FEE_REQUEST, SHIPPING_FEE_SUCCESS, SHIPPING_FEE_FAIL
} from '../constants/orderConstants';

const shippingFeeReducer = (state = { }, action) => {
    switch (action.type) {
        case SHIPPING_FEE_CHANGE:
        case SHIPPING_FEE_REQUEST:
            return { loading: true }
        case SHIPPING_FEE_SUCCESS:
            return { loading: false, info: action.payload };
        case SHIPPING_FEE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { shippingFeeReducer }