import Swal from "sweetalert2";
import { LOGIN, REGISTER } from "./actionTypes";
import { setLoading } from "./dataAction";
export const loginSuccess = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
export const registerSuccess = (payload) => {
  return {
    type: REGISTER,
    payload: payload,
  };
};

export const LoginUser = (url, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors"
        },
        body: JSON.stringify(user),
      });
      console.log(response)
      if (!response.ok) {
        throw await response.json();
      }
      const data = await response.json();
      Swal.fire({
        icon: "success",
        text: `Login Success`,
      });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      dispatch(loginSuccess(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};
export const RegisterUser = (url, data) => {
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
      const registerData = await response.json();
      Swal.fire({
        icon: "success",
        text: `Register Success`,
      });
      dispatch(registerSuccess(registerData));
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };
};
