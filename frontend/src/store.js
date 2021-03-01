import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { langReducer } from './reducers/globalReducer';
import { bestsellersReducer, bookGenresReducer, cartReducer, recommendedsReducer, storeReducer, viewingProductReducer } from './reducers/productReducers';
import { shippingAddressReducer } from './reducers/orderReducers';
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
    userSignin: { userInfo },
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
    userSignin: userSigninReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
