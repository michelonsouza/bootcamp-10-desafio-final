import * as types from '~/store/types';

export function deliverymansRequest(page) {
  return {
    type: types.DELIVERYMANS_REQUEST,
    payload: { page },
  };
}

export function deliverymansSuccess(data, pagination) {
  return {
    type: types.DELIVERYMANS_SUCCESS,
    payload: { data, pagination },
  };
}

export function createDeliveryman(data) {
  return {
    type: types.CREATE_DELIVERYMAN,
    payload: { data },
  };
}

export function deleteDeliveryman(id) {
  return {
    type: types.DELETE_DELIVERYMAN,
    payload: { id },
  };
}

export function deliverymanFilterRequest(query) {
  return {
    type: types.DELIVERYMANS_FILTER_REQUEST,
    payload: { query },
  };
}

export function updateDeliverymanRequest(data, id) {
  return {
    type: types.UPDATE_DELIVERYMAN_REQUEST,
    payload: { data, id },
  };
}

export function updateDeliverymanSuccess(data) {
  return {
    type: types.UPDATE_DELIVERYMAN_SUCCESS,
    payload: { data },
  };
}

export function updateDeliverymanFailure() {
  return {
    type: types.UPDATE_DELIVERYMAN_FAILURE,
  };
}
