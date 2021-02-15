import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { langReducer } from './reducers/globalReducer';
import { bestsellersReducer, bookGenresReducer, cartReducer, recommendedsReducer, storeReducer, viewingProductReducer } from './reducers/productReducers';
import { data_sample, BOOK_GENRES } from './data_sample';

const cartList = Cookie.getJSON('cartList') || [];

const initialState = {
    language: navigator.language === 'vi' ? 'vi' : 'en',
    bestsellerProducts: { bestsellers: data_sample.bestsellers },
    recommendedProducts: { recommendeds: data_sample.recommendeds },
    cart: { cartList },
    viewingProduct: { product: data_sample.viewingProduct },
    store: { products: data_sample.products },
    bookGenres: { genres: BOOK_GENRES }
    // userSignin: null,
};

const reducer = combineReducers({
    language: langReducer,
    bestsellerProducts: bestsellersReducer,
    recommendedProducts: recommendedsReducer,
    cart: cartReducer,
    viewingProduct: viewingProductReducer,
    store: storeReducer,
    bookGenres: bookGenresReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
