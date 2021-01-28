import { SWITCH_LANGUAGE } from '../constants/langConstants';

function langReducer(state = 'en', action) {
    switch(action.type) {
        case SWITCH_LANGUAGE:
            return action.payload;
        default:
            return state;
    }
}

export { langReducer };