import {
    CREATE_PATIENT_REQUEST,
    CREATE_PATIENT_SUCCESS,
    CREATE_PATIENT_ERROR,
    CREATE_PATIENT_RESET,
    QUEUE_PATIENT_REQUEST,
    QUEUE_PATIENT_SUCCESS,
    QUEUE_PATIENT_ERROR,
    SEARCH_PATIENT_REQUEST,
    SEARCH_PATIENT_SUCCESS,
    SEARCH_PATIENT_ERROR,
    DISMISS_ERROR
} from '../actions/constants'

const initialState = {
    patientId: null,
    queueId: null,
    loading: false,
    error: null
};

const profileReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case CREATE_PATIENT_REQUEST: {
            console.log('test')
            return {...state, loading: true };
        }
        case CREATE_PATIENT_SUCCESS: {
            console.log('tested')
            return {...state, loading: false, patientId: payload.patientId};
        }
        case CREATE_PATIENT_ERROR: {
            return {...state, loading: false, error: payload.error};
        }
        case QUEUE_PATIENT_REQUEST: {
            return {...state, loading: true, error: payload.error};
        }
        case QUEUE_PATIENT_SUCCESS: {
            return {...state, loading: false, queueId: payload.queueId}
        }
        case QUEUE_PATIENT_ERROR: {
            return {...state, loading: false, error: payload.error}
        }
        case CREATE_PATIENT_RESET: {
            return {...state, patientId: null, queueId: null}
        }
        case DISMISS_ERROR: {
            return {...state, error: null}
        }
        default: return state;
    }
}

export default profileReducer