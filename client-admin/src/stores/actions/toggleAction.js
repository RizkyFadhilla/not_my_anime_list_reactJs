import {
  ADD_ANIME_TOGGLE,
  VIEW_CAST_TOGGLE,
  ADD_GENRE_TOGGLE,
  EDIT_GENRE_TOGGLE,
} from "./actionTypes";
import Swal from "sweetalert2";
import {
  fetchGenreSuccess,
  fetchGenreByIdSuccess,
  setLoadingGenreById,
} from "./dataAction";

export const AddAnimeToggle = (boolean) => {
  return {
    type: ADD_ANIME_TOGGLE,
    payload: boolean,
  };
};

export const viewCastToggle = (boolean) => {
  return {
    type: VIEW_CAST_TOGGLE,
    payload: boolean,
  };
};

export const AddGenreToggle = (boolean) => {
  return {
    type: ADD_GENRE_TOGGLE,
    payload: boolean,
  };
};
export const EditGenreToggle = (boolean) => {
  return {
    type: EDIT_GENRE_TOGGLE,
    payload: boolean,
  };
};

export const handleShow = (boolean) => {
  return async (dispatch) => {
    try {
      dispatch(AddAnimeToggle(boolean));
      console.log(boolean);
      const response = await fetch("https://notmyanimelistserver-production.up.railway.app/private/genre/", {
        method: "GET",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error("Internal Service Error");
      const data = await response.json();
      data.forEach((element) => {
        element.createdAt = element.createdAt.slice(0, 10);
        element.updatedAt = element.createdAt.slice(0, 10);
      });
      dispatch(fetchGenreSuccess(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    }
  };
};
export const viewCastHandleShow = (boolean, data) => {
  return async (dispatch) => {
    await dispatch(viewCastToggle([boolean, data]));
  };
};

export const handleShowGenre = (boolean) => {
  return async (dispatch) => {
    console.log(boolean);
    await dispatch(AddGenreToggle(boolean));
  };
};
export const handleEditShowGenre = (boolean, id) => {
  return async (dispatch) => {
    try {
      await dispatch(EditGenreToggle(boolean));
      if (id) {
        const response = await fetch(
          `https://notmyanimelistserver-production.up.railway.app/private/genre/${id}`,
          {
            method: "GET",
            headers: {
              access_token: localStorage.access_token,
            },
          }
        );
        if (!response.ok) throw await response.json();
        const data = await response.json();
        console.log(data);
        dispatch(fetchGenreByIdSuccess(data));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    } finally {
      dispatch(setLoadingGenreById(false));
    }
  };
};
