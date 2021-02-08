import { 
    SWITCH_LANGUAGE, APPLY_VI, APPLY_EN,
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

export { langReducer };