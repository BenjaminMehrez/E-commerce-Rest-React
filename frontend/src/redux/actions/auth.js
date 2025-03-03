import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

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
        `${import.meta.env.VITE_API_URL}/auth/users/`,
        body,
        config
      );
      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(
          setAlert("Te enviamos un correo, por favor activa tu cuenta", "green")
        );
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Error al crear cuenta", "red"));
      }
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });

      if (error.response) {
        const errorData = error.response.data;

        // Si el error viene en email
        if (errorData.email) {
          let errorMsg = errorData.email[0];

          if (
            errorMsg.includes("user account with this email already exists")
          ) {
            errorMsg = "Este correo ya está registrado. Intenta con otro.";
          } else if (errorMsg.includes("Enter a valid email address")) {
            errorMsg = "Por favor, ingresa un correo válido.";
          }

          dispatch(setAlert(errorMsg, "red"));
        }
        // Si el error viene en password
        else if (errorData.password) {
          let errorMsg = errorData.password[0];

          if (errorMsg.includes("This password is too common")) {
            errorMsg = "La contraseña es demasiado común. Usa una más segura.";
          } else if (errorMsg.includes("This password is too short")) {
            errorMsg =
              "La contraseña es muy corta. Debe tener al menos 8 caracteres.";
          } else if (errorMsg.includes("This password is entirely numeric")) {
            errorMsg = "La contraseña no puede contener solo números.";
          }

          dispatch(setAlert(errorMsg, "red"));
        }
        // Si las contraseñas no coinciden
        else if (errorData.non_field_errors) {
          let errorMsg = errorData.non_field_errors[0];

          if (errorMsg.includes("The two password fields didn't match.")) {
            errorMsg = "Las contraseñas no coinciden.";
          }

          dispatch(setAlert(errorMsg, "red"));
        }
        // Si el error es un campo vacío
        else {
          dispatch(setAlert("Completa todos los campos correctamente.", "red"));
        }
      } else {
        dispatch(
          setAlert("Error conectando con el servidor, intenta más tarde", "red")
        );
      }
    }
  };

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: "JWT " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/users/me/`,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/jwt/create`,
      body,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Inicio de sesion con exito", "green"));
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Error al iniciar de sesion", "red"));
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    if (error.response) {
      const errorData = error.response.data;

      if (errorData.detail) {
        let errorMsg = errorData.detail;

        if (
          errorMsg.includes(
            "No active account found with the given credentials"
          )
        ) {
          errorMsg = "Correo o contraseña incorrectos.";
        }

        dispatch(setAlert(errorMsg, "red"));
      } else {
        dispatch(
          setAlert("Error al iniciar sesión. Inténtalo más tarde.", "red")
        );
      }
    }
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
      `${import.meta.env.VITE_API_URL}/auth/users/activation/`,
      body,
      config
    );

    if (res.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      dispatch(setAlert("Cuenta Activada correctamente", "green"));
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      dispatch(setAlert("Error al activar cuenta", "red "));
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
    dispatch(
      setAlert("Error al conectar con el servidor, intenta mas tarde.", "red ")
    );
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/jwt/refresh/`,
        body,
        config
      );
      if (res.status === 200) {
        type: REFRESH_SUCCESS;
        payload: res.data;
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
  });

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/users/reset_password/`,
      body,
      config
    );
    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Password reset email sent", "green"));
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Error sending password reset email", "red"));
    }
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    dispatch(setAlert("Error sending password reset email", "red"));
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
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
      new_password,
      re_new_password,
    });

    if (new_password !== re_new_password) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Passwords do not match", "red"));
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/users/reset_password_confirm/`,
          body,
          config
        );
        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
          dispatch(setAlert("Password changed successfully", "green"));
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
          dispatch(setAlert("Error changing password", "red"));
        }
      } catch (error) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        dispatch(setAlert("Error changing password", "red"));
      }
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("Sesion cerrada", "green"));
};
