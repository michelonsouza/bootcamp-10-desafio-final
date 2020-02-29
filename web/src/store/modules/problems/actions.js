import * as types from '~/store/types';

export function problemsRequest(page) {
  return {
    type: types.PROBLEMS_REQUEST,
    payload: { page },
  };
}

export function problemsSuccess(data) {
  return {
    type: types.PROBLEMS_SUCCESS,
    payload: { data },
  };
}

export function problemCancelDelivery(id) {
  return {
    type: types.PROBLEMS_CANCEL_DELIVERY,
    payload: { id },
  };
}

export function problemsFailure() {
  return {
    type: types.PROBLEMS_FAILURE,
  };
}
