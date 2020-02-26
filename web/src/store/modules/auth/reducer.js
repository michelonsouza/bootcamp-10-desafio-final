import produce from 'immer';

import * as types from '~/store/types';

const initalState = {
  signed: false,
  loading: false,
  user: null,
  token: null,
};

export default function auth(state = initalState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.LOGIN_SUCCESS: {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.loading = false;
        draft.signed = true;
        break;
      }
      case types.LOGIN_FAILURE: {
        draft.loading = false;
        break;
      }
      case types.LOGOUT: {
        draft.token = null;
        draft.user = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
