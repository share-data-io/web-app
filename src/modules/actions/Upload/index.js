import {
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_CHANGE,
  UPLOAD_RESET,
  UPLOAD_CANCEL,
} from "../../actionTypes/Upload/Types";

export const uploadStart = (data = {}) => {
  return async (dispatch) => {
    try {
      //Dispatch start
      dispatch(startUploading(data));
      //Send properties get request
    } catch (err) {
      dispatch(failureUploading(err.message));
    }
  };
};

export const uploadUpdate = (data = {}) => {
  return async (dispatch) => {
    try {
      //Dispatch start
      dispatch(updateUpload(data));
      //Send properties get request
    } catch (err) {
      dispatch(failureUploading(err.message));
    }
  };
};

//Get customer property basic info by id start
export function startUploading(data) {
  return {
    type: UPLOAD_START,
    payload: data,
  };
}

//Get customer property basic info by id success
export function successUploading() {
  return {
    type: UPLOAD_SUCCESS,
    payload: true,
  };
}

//Get customer property basic info by id failure
export function failureUploading(error) {
  return {
    type: UPLOAD_FAILURE,
    payload: { error },
  };
}

export function updateUpload(data) {
  return {
    type: UPLOAD_CHANGE,
    payload: data,
  };
}

export function resetUpload() {
  return {
    type: UPLOAD_RESET,
  };
}

export function cancelUpload() {
  return {
    type: UPLOAD_CANCEL,
  };
}
