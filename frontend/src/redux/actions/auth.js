import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const signup =
  (first_name, last_name, email, password, re_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/users/`,
        body,
        config
      );
      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert('Te enviamos un correo, por favor activa tu cuenta', 'green'))
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch(setAlert('Error al crear cuenta', 'red'))

      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert('Error conectando con el servidor, intenta mas tarde', 'red'))

    }
  };

export const activate = (uid, token) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    uid,
    token,
  });

  try {
    const res = await axios.post(
      `http://localhost:8000/auth/users/activation/`,
      body,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      dispatch(setAlert('Cuenta Activada correctamente', 'green'))

    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      dispatch(setAlert('Error al activar cuenta', 'red '))
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    console.log(error);
    dispatch(setAlert('Error al conectar con el servidor, intenta mas tarde.', 'red '))
    
  }
};
