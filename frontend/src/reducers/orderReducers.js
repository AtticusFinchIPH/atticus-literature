
import Cookie from 'js-cookie';
import {
    SHIPPING_FEE_CHANGE, SHIPPING_FEE_REQUEST, SHIPPING_FEE_SUCCESS, SHIPPING_FEE_FAIL, SHIPPING_ADDRESS_SAVE
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

const shippingAddressReducer = (state = Cookie.get('shippingAddress') || {}, action) => {
    switch (action.type) {
        case SHIPPING_ADDRESS_SAVE:
            const { country, state, city } = action.payload;
            Cookie.set('shippingAddress', JSON.stringify({ country, state, city }));
            return { country, state, city };
        default:
            return {}
    }
}

export { shippingFeeReducer, shippingAddressReducer }