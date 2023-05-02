import {
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_CHANGE,
  UPLOAD_RESET,
  UPLOAD_CANCEL
} from "../../actionTypes/Upload/Types";

//Set initial state for owner
const initialState = {
  data: {},
  loading: false,
  error: null,
  isCompleted: false,
  isCancelled: false,
};

//Export new state using switch
const homeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPLOAD_START:
      return {
        data: action.payload,
        isCompleted: false,
        loading: true,
        error: null,
        isCancelled: false,
      };

    case UPLOAD_CHANGE:
      return {
        data: action.payload,
        isCompleted: false,
        loading: true,
        error: null,
        isCancelled: false,
      };

    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isCompleted: action.payload,
        isCancelled: false,
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case UPLOAD_RESET:
      return {
        data: {},
        loading: false,
        error: null,
        isCompleted: false,
        isCancelled: false,
      };

    case UPLOAD_CANCEL:
      return {
        data: {},
        loading: false,
        error: null,
        isCompleted: false,
        isCancelled: true,
      };

    default:
      return state;
  }
};

export default homeReducer;
