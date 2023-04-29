import {
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_CHANGE,
  UPLOAD_RESET,
} from "../../actionTypes/Upload/Types";

//Set initial state for owner
const initialState = {
  data: {},
  loading: false,
  error: null,
  isCompleted: false,
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
      };

    case UPLOAD_CHANGE:
      return {
        data: action.payload,
        isCompleted: false,
        loading: true,
        error: null,
      };

    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isCompleted: action.payload,
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
      };

    default:
      return state;
  }
};

export default homeReducer;
