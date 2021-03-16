import { 
    SWITCH_LANGUAGE, APPLY_VI, APPLY_EN, ADD_ERROR, REMOVE_ERRORS,
} from '../constants/globalConstants';

const langReducer = (state = 'en', action) => {
    switch(action.type) {
        case SWITCH_LANGUAGE:
            return action.payload;
        case APPLY_VI:
            return 'vi';
        case APPLY_EN:
            return 'en';
        default:
            return state;
    }
}

const notisReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ERROR:
            return [...state, action.payload];
        case REMOVE_ERRORS:
            return [];    
        default:
            return state;
    }
}

export { langReducer, notisReducer };