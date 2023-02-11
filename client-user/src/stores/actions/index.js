import {
  FETCH_ALL_SUCCESS,
  FETCH_ONE_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  SET_LOADING_DETAIL,
} from "./actionTypes";

export const fetchSuccess = (payload) => {
  return {
    type: FETCH_ALL_SUCCESS,
    payload: payload,
  };
};

export const fetchOneSuccess = (payload) => {
  return {
    type: FETCH_ONE_SUCCESS,
    payload: payload,
  };
};

export const setLoading = (boolean) => {
  return {
    type: SET_LOADING,
    payload: boolean,
  };
};
export const setLoadingDetail = (boolean) => {
  return {
    type: SET_LOADING_DETAIL,
    payload: boolean,
  };
};
export const setError = (data) => {
  return {
    type: SET_ERROR,
    payload: data,
  };
};

export const fetchAllData = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url,{
        method:"GET"
      });
      if (!response.ok) throw new Error("Internal Service Error");
      const data = await response.json()
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchOneData = (url) => {
  return async (dispatch) => {
    try {
      console.log("trigger");
      const response = await fetch(url);
      console.log(response, "ini di store");
      if (!response.ok) throw new Error("Internal Service Error");
      const data = await response.json();
      dispatch(fetchOneSuccess(data));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoadingDetail(false));
    }
  };
};
