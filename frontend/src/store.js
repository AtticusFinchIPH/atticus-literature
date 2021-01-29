import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { langReducer, themeReducer } from './reducers/globalReducer';

const initialState = {
    language: navigator.language === 'vi' ? 'vi' : 'en',
    isDarkMode: false,
    // userSignin: null,
};

const reducer = combineReducers({
    language: langReducer,
    isDarkMode: themeReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
