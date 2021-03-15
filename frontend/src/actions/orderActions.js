import axios from '../utils/axiosInstance';
import {
    SHIPPING_FEE_CHANGE, SHIPPING_FEE_REQUEST, SHIPPING_FEE_SUCCESS, SHIPPING_FEE_FAIL, SHIPPING_ADDRESS_SAVE, ORDER_FORM_SHIPPING_SAVE
} from '../constants/orderConstants';

const getShippingFee = ({ countryId, stateId, cityId }) => async (dispatch) => {
    dispatch({ type: SHIPPING_FEE_REQUEST });
    try {
        const {data} = await axios.get('/api/orders/shipping_fee',
            {
                params: { countryId, stateId, cityId }
            }
        );
        dispatch({ type: SHIPPING_FEE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SHIPPING_FEE_FAIL, payload: error.response?.data?.msg || error.message });
    }
}

const changeShippingFee = () => (dispatch) => {
    dispatch({ type: SHIPPING_FEE_CHANGE });
}

const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: SHIPPING_ADDRESS_SAVE, payload: data });
}

const saveOrderFormShipping = (data) => (dispatch) => {
    dispatch({ type: ORDER_FORM_SHIPPING_SAVE, payload: data });
}

export { getShippingFee, changeShippingFee, saveShippingAddress, saveOrderFormShipping };