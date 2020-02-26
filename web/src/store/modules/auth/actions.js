import * as types from '~/store/types';

export function loginRequest(email, password) {
  return {
    type: types.LOGIN_REQUEST,
    payload: { email, password },
  };
}

export function loginSuccess(token, user) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { token, user },
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE,
  };
}

export function logOut() {
  return {
    type: types.LOGOUT,
  };
}
