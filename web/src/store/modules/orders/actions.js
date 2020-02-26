import * as types from '~/store/types';

export function ordersRequest(page) {
  return {
    type: types.ORDERS_REQUEST,
    payload: { page },
  };
}

export function createOrderRequest(data) {
  return {
    type: types.CREATE_ORDER,
    payload: { data },
  };
}

export function cancelOrderRequest(id) {
  return {
    type: types.CANCEL_ORDER_REQUEST,
    payload: { id },
  };
}

export function ordersSuccess(data, pagination) {
  return {
    type: types.ORDERS_SUCCESS,
    payload: { data, pagination },
  };
}

export function ordersFilteredRequest(query) {
  return {
    type: types.ORDERS_FILTERED,
    payload: { query },
  };
}

export function updateOrderRequest(data, id) {
  return {
    type: types.UPDATE_ORDER_REQUEST,
    payload: { data, id },
  };
}

export function updateOrderFailed() {
  return {
    type: types.UPDATE_ORDER_FAILURE,
  };
}
