import { 
    SWITCH_LANGUAGE, APPLY_VI, APPLY_EN, ADD_NOTI, REMOVE_NOTIS,
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
        case ADD_NOTI:
            return [...state, action.payload];
        case REMOVE_NOTIS:
            return [];    
        default:
            return state;
    }
}

export { langReducer, notisReducer };