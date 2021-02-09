import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { langReducer } from './reducers/globalReducer';
import { bestsellersReducer, recommendedsReducer } from './reducers/productReducers';
import data from './data_sample';

const initialState = {
    language: navigator.language === 'vi' ? 'vi' : 'en',
    bestsellerProducts: { bestsellers: data.bestsellers },
    recommendedProducts: { recommendeds: data.recommendeds },
    // userSignin: null,
};

const reducer = combineReducers({
    language: langReducer,
    bestsellerProducts: bestsellersReducer,
    recommendedProducts: recommendedsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
