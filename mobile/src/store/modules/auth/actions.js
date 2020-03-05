import * as types from '~/store/types';

export function loginRequest(id) {
  return {
    type: types.LOGIN_REQUEST,
    payload: { id },
  };
}

export function loginSuccess(deliveryman) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { deliveryman },
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE,
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}
