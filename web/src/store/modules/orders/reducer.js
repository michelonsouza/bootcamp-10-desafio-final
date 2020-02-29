import produce from 'immer';

import * as types from '~/store/types';

const initialData = {
  orders: [],
  pagination: null,
  loading: true,
};

export default function orders(state = initialData, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.CREATE_ORDER:
      case types.ORDERS_REQUEST:
      case types.UPDATE_ORDER_REQUEST:
      case types.CANCEL_ORDER_REQUEST:
      case types.ORDERS_FILTERED: {
        draft.loading = true;
        break;
      }
      case types.ORDERS_SUCCESS: {
        draft.loading = false;
        draft.orders = action.payload.data;
        draft.pagination = action.payload.pagination;
        break;
      }
      case types.ORDER_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
