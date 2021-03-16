import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { langReducer, notisReducer } from './reducers/globalReducer';
import { bestsellersReducer, bookGenresReducer, cartReducer, recommendedsReducer, storeReducer, viewingProductReducer } from './reducers/productReducers';
import { orderFormShippingReducer, shippingAddressReducer } from './reducers/orderReducers';
import { userSigninReducer } from './reducers/userReducers';

const cartList = Cookie.getJSON('cartList') || [];
const shippingAddressObj = Cookie.getJSON('shippingAddress') || {};
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    language: navigator.language === 'vi' ? 'vi' : 'en',
    bestsellerProducts: { bestsellers: [] },
    recommendedProducts: { recommendeds: [] },
    cart: { cartList },
    viewingProduct: { product: null },
    store: { products: [] },
    bookGenres: { genres: [] },
    shippingAddress: shippingAddressObj,
    orderFormShipping: {},
    userSignin: { userInfo },
    notis: [],
};

const reducer = combineReducers({
    language: langReducer,
    bestsellerProducts: bestsellersReducer,
    recommendedProducts: recommendedsReducer,
    cart: cartReducer,
    viewingProduct: viewingProductReducer,
    store: storeReducer,
    bookGenres: bookGenresReducer,
    shippingAddress: shippingAddressReducer,
    orderFormShipping: orderFormShippingReducer,
    userSignin: userSigninReducer,
    notis: notisReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
