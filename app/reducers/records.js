import {
  ADD_VITALS_REQUEST,
  ADD_VITALS_SUCCESS,
  ADD_VITALS_ERROR,
  ADD_CHIEF_COMPLAINTS_REQUEST,
  ADD_CHIEF_COMPLAINTS_SUCCESS,
  ADD_CHIEF_COMPLAINTS_ERROR,
  ADD_GYNAECOLOGY_INFO_REQUEST,
  ADD_GYNAECOLOGY_INFO_SUCCESS,
  ADD_GYNAECOLOGY_INFO_ERROR,
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_MEDICAL_HISTORY_SUCCESS,
  UPDATE_MEDICAL_HISTORY_ERROR,
  UPDATE_SCREENING_RESULT_REQUEST,
  UPDATE_SCREENING_RESULT_SUCCESS,
  UPDATE_SCREENING_RESULT_ERROR,
  UPDATE_MEDICAL_CONDITION_REQUEST,
  UPDATE_MEDICAL_CONDITION_SUCCESS,
  UPDATE_MEDICAL_CONDITION_ERROR,
  ATTACH_METADATA_REQUEST,
  ATTACH_METADATA_SUCCESS,
  ATTACH_METADATA_ERROR,
  ADD_CASE_REQUEST,
  ADD_CASE_SUCCESS,
  ADD_CASE_ERROR,
  DISMISS_ERROR,
  FETCH_MEDICAL_RECORDS_REQUEST,
  FETCH_MEDICAL_RECORDS_SUCCESS,
  FETCH_MEDICAL_RECORDS_ERROR,
  FETCH_MEDICINE_REQUEST,
  FETCH_MEDICINE_SUCCESS,
  FETCH_MEDICINE_ERROR,
  FETCH_MEDICAL_DIAGNOSIS_REQUEST,
  FETCH_MEDICAL_DIAGNOSIS_SUCCESS,
  FETCH_MEDICAL_DIAGNOSIS_ERROR,
  FETCH_PRESCRIPTION_REQUEST,
  FETCH_PRESCRIPTION_SUCCESS,
  FETCH_PRESCRIPTION_ERROR,
  DISCHARGE_PATIENT_REQUEST,
  DISCHARGE_PATIENT_SUCCESS,
  DISCHARGE_PATIENT_ERROR,
  TRANSFER_PATIENT_SUCCESS,
  FETCH_PATIENT_CASES_REQUEST,
  FETCH_PATIENT_CASES_SUCCESS,
  FETCH_PATIENT_CASES_ERROR,
} from '../actions/constants';

const initialState = {
  loading: {
    spinner: false
  },
  patients: {},
  medicines: [],
  diagnosises: [],
  error: null
}

const medicalRecordReducer = (state = initialState, {payload, type}) => {
  switch(type) {
    case FETCH_MEDICAL_RECORDS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_MEDICAL_RECORDS_SUCCESS: {
      return {...state, loading: {spinner: false}, patients: {...state.patients, [payload.patientId]: payload.records}}
    }
    case FETCH_MEDICAL_RECORDS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case FETCH_MEDICINE_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_MEDICINE_SUCCESS: {
      return {...state, loading: {spinner: false}, medicines: payload.medicines}
    }
    case FETCH_MEDICINE_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case FETCH_PRESCRIPTION_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_PRESCRIPTION_SUCCESS: {
      return {...state, loading: {spinner: false}, patients: {...state.patients, [payload.queueId]: payload.prescriptions}}
    }
    case FETCH_PRESCRIPTION_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case FETCH_MEDICAL_DIAGNOSIS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_MEDICAL_DIAGNOSIS_SUCCESS: {
      return {...state, loading: {spinner: false}, diagnosises: payload.diagnosises}
    }
    case FETCH_MEDICAL_DIAGNOSIS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ATTACH_METADATA_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ATTACH_METADATA_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ATTACH_METADATA_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_VITALS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_VITALS_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_VITALS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_CHIEF_COMPLAINTS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_CHIEF_COMPLAINTS_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_CHIEF_COMPLAINTS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_GYNAECOLOGY_INFO_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_GYNAECOLOGY_INFO_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_GYNAECOLOGY_INFO_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case UPDATE_MEDICAL_HISTORY_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case UPDATE_MEDICAL_HISTORY_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case UPDATE_MEDICAL_HISTORY_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case UPDATE_SCREENING_RESULT_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case UPDATE_SCREENING_RESULT_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case UPDATE_SCREENING_RESULT_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case UPDATE_MEDICAL_CONDITION_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case UPDATE_MEDICAL_CONDITION_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case UPDATE_MEDICAL_CONDITION_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_CASE_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_CASE_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_CASE_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case FETCH_PATIENT_CASES_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_PATIENT_CASES_SUCCESS: {
      return {...state, loading: {spinner: false}, patients: {...state.patients, [payload.queueId]: {...state.patients[payload.queueId], cases: payload.cases}}}
    }
    case FETCH_PATIENT_CASES_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case DISMISS_ERROR: {
      return {...state, error: null}
    }
    case DISCHARGE_PATIENT_REQUEST: {
      return {...state, loading: {...state.loading, spinner: true}}
    }
    case DISCHARGE_PATIENT_SUCCESS: {
      const patients = state.patients
      delete patients[payload.queueId]
      return {...state, loading: {...state.loading, spinner: false}, patients}
    }
    case DISCHARGE_PATIENT_ERROR: {
      return {...state, loading: {...state.loading, spinner: false}, error: payload.error}
    }
    case TRANSFER_PATIENT_SUCCESS: {
      const { patients } = state
      delete patients[payload.queueId]
      return {...state, loading: {...state.loading, spinner: false}, patients }
    }
    default: return state
  }
}

export default medicalRecordReducer