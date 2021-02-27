import axios from 'axios';
import {
    SHIPPING_FEE_CHANGE, SHIPPING_FEE_REQUEST, SHIPPING_FEE_SUCCESS, SHIPPING_FEE_FAIL
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

export { getShippingFee, changeShippingFee };