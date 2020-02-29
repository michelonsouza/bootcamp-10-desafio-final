import produce from 'immer';

import * as types from '~/store/types';

const initalState = {
  loading: false,
  problems: [],
};

export default function problems(state = initalState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.PROBLEMS_REQUEST:
      case types.PROBLEMS_CANCEL_DELIVERY: {
        draft.loading = true;
        break;
      }
      case types.PROBLEMS_SUCCESS: {
        draft.loading = false;
        draft.problems = action.payload.data;
        break;
      }
      case types.PROBLEMS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
