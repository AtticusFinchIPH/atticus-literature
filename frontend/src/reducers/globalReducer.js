import { 
    SWITCH_LANGUAGE, APPLY_VI, APPLY_EN, 
    SWITCH_THEME 
} from '../constants/globalConstants';

function langReducer(state = 'en', action) {
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

function themeReducer(state = false, action) { // isDarkMode = false
    switch(action.type) {
        case SWITCH_THEME:
            return !state;
        default:
            return state;
    }
}

export { langReducer, themeReducer };