import produce from 'immer';

import * as types from '~/store/types';

const initalState = {
  user: null,
};

export default function auth(state = initalState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_SUCCESS: {
        draft.user = action.payload.user;
        break;
      }
      case types.LOGOUT: {
        draft.user = null;
        break;
      }
      default:
    }
  });
}
