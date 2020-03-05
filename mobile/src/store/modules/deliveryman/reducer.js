import produce from 'immer';

import * as types from '~/store/types';

const initailData = {
  deliveryman: null,
};

export default function deliveryman(state = initailData, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_SUCCESS: {
        draft.deliveryman = action.payload.deliveryman;
        break;
      }
      case types.LOGOUT: {
        draft.deliveryman = null;
        break;
      }
      default:
    }
  });
}
