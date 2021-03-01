
import Cookie from 'js-cookie';
import {
    SHIPPING_FEE_CHANGE, SHIPPING_FEE_REQUEST, SHIPPING_FEE_SUCCESS, SHIPPING_FEE_FAIL, SHIPPING_ADDRESS_SAVE
} from '../constants/orderConstants';

const shippingAddressReducer = (storeState = Cookie.get('shippingAddress') || {}, action) => {
    switch (action.type) {
        case SHIPPING_FEE_CHANGE:
            case SHIPPING_FEE_REQUEST:
                Cookie.set('shippingAddress', JSON.stringify({...storeState, loading: true }));
                return {...storeState, loading: true }
            case SHIPPING_FEE_SUCCESS:
                Cookie.set('shippingAddress', JSON.stringify({...storeState, loading: false, info: action.payload }));
                return {...storeState, loading: false, info: action.payload };
            case SHIPPING_FEE_FAIL:
                Cookie.set('shippingAddress', JSON.stringify({...storeState, loading: false, error: action.payload }));
                return {...storeState, loading: false, error: action.payload };
        case SHIPPING_ADDRESS_SAVE:
            const { country, state, city } = action.payload;
            Cookie.set('shippingAddress', JSON.stringify({...storeState, country, state, city }));
            return {...storeState, country, state, city };
        default:
            return storeState;
    }
}

export { shippingAddressReducer }