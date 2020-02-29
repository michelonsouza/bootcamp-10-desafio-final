import produce from 'immer';

import * as types from '~/store/types';

const initialState = {
  deliverymans: [],
  pagination: null,
  loading: true,
};

export default function deliverymans(state = initialState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.DELIVERYMANS_SUCCESS: {
        draft.deliverymans = action.payload.data;
        draft.pagination = action.payload.pagination;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
