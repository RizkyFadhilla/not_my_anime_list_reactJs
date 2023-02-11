import {
  FETCH_ALL_SUCCESS,
  FETCH_GENRE_SUCCESS,
  FETCH_GENRE_BY_ID_SUCCESS,
  SET_LOADING,
  ADD_DATA,
  SET_ERROR,
  SET_LOADING_EDIT_GENRE,
} from "./actionTypes";
import Swal from "sweetalert2";
export const fetchSuccess = (payload) => {
  return {
    type: FETCH_ALL_SUCCESS,
    payload: payload,
  };
};
export const fetchGenreSuccess = (payload) => {
  return {
    type: FETCH_GENRE_SUCCESS,
    payload: payload,
  };
};
export const fetchGenreByIdSuccess = (payload) => {
  return {
    type: FETCH_GENRE_BY_ID_SUCCESS,
    payload: payload,
  };
};

export const setLoading = (boolean) => {
  return {
    type: SET_LOADING,
    payload: boolean,
  };
};
export const setLoadingGenreById = (boolean) => {
  return {
    type: SET_LOADING_EDIT_GENRE,
    payload: boolean,
  };
};
export const setError = (data) => {
  return {
    type: SET_ERROR,
    payload: data,
  };
};
export const addDataHandle = (data) => {
  return {
    type: ADD_DATA,
    payload: data,
  };
};

export const fetchAllData = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error("Internal Service Error");
      const data = await response.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(setError(error));
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchGenreData = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw await response.json();
      const data = await response.json();
      data.forEach((element) => {
        element.createdAt = element.createdAt.slice(0, 10);
        element.updatedAt = element.createdAt.slice(0, 10);
      });
      dispatch(fetchGenreSuccess(data));
    } catch (error) {
      dispatch(setError(error));
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const AddData = (url, data, cast) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({ data, cast }),
      });
      if (!response.ok) {
        throw await response.json();
      }
      const responseData = await response.json();
      dispatch(addDataHandle(responseData));
      Swal.fire({
        icon: "success",
        text: `Add Data Success`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    }
  };
};

export const DeleteAnime = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) {
        throw await response.json();
      }
      Swal.fire({
        icon: "success",
        text: `Delete Success`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    }
  };
};

export const DeleteGenre = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) {
        throw await response.json();
      }
      Swal.fire({
        icon: "success",
        text: `Delete Success`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    }
  };
};

export const GenreAdd = (url, data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw await response.json();
      }
      Swal.fire({
        icon: "success",
        text: `Add Genre Success`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    }
  };
};
export const fetchGenreDataById = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw await response.json();
      const data = await response.json();
      dispatch(fetchGenreByIdSuccess(data));
    } catch (error) {
      dispatch(setError(error));
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    } finally {
      dispatch(setLoadingGenreById(false));
    }
  };
};
export const EditGenre = (url, data) => {
  console.log(url, data);
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) throw await response.json();
      Swal.fire({
        icon: "success",
        text: `Edit Genre Success`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    }
  };
};
