import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { langReducer } from './reducers/langReducer';

const initialState = {
    language: navigator.language === 'vi' ? 'vi' : 'en',
    // theme: 'light',
    // userSignin: null,
};

const reducer = combineReducers({
    language: langReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
