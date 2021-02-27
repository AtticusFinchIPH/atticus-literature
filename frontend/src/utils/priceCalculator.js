
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

const retailPriceCalc = (item) => {
    const { price, currency } = item;
    let retailPrice;
    switch (currency) {
        case 'usd':
            retailPrice = `$ ${new BigNumber(price).decimalPlaces(2)}`;
            break;
        case 'vnd':
            retailPrice = `${new BigNumber(price).decimalPlaces(0)} vnđ`;
            break;
        default:
            retailPrice = `$ ${new BigNumber(price).decimalPlaces(2)}`;
            break;
    }
    return retailPrice;
}

retailPriceCalc.PropTypes = PropTypes.shape({
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
})

const wholeSaleCalc = (item) => {
    const { price, currency, quantity } = item;
    let wholeSale;
    switch (currency) {
        case 'usd':
            wholeSale = `$ ${new BigNumber(price * quantity).decimalPlaces(2)}`;
            break;
        case 'vnd':
            wholeSale = `${new BigNumber(price * quantity).decimalPlaces(0)} vnđ`;
            break;
        default:
            wholeSale = `$ ${new BigNumber(price * quantity).decimalPlaces(2)}`;
            break;
    }
    return wholeSale;
}

wholeSaleCalc.PropTypes = PropTypes.shape({
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
})

const subtotalCalc = (items) => {
    const number = new BigNumber(items.reduce((total, item) => {
        return total + item.price*item.quantity;
    }, 0));
    switch (items[0]?.currency) {
        case 'usd':
            return`$ ${number.decimalPlaces(2)}`;
        case 'vnd':
            return `${number.decimalPlaces(0)} vnđ`;
        default:
            return `$ ${number.decimalPlaces(2)}`;
    }
}

subtotalCalc.PropTypes = PropTypes.arrayOf(
    PropTypes.shape({
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    })
)

const shippingFeeCalc = (fee, currency = 'usd') => {
    switch (currency) {
        case 'usd':
            return`$ ${new BigNumber(fee).decimalPlaces(2)}`;
        case 'vnd':
            return `${new BigNumber(fee).decimalPlaces(0)} vnđ`;
        default:
            return `$ ${new BigNumber(fee).decimalPlaces(2)}`;
    }
}

export { retailPriceCalc, wholeSaleCalc, subtotalCalc, shippingFeeCalc }