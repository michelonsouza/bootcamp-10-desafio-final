import produce from 'immer';

import * as types from '~/store/types';

const initialData = {
  signed: false,
  loading: false,
};

export default function auth(state = initialData, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case types.LOGIN_SUCCESS: {
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case types.LOGIN_FAILURE: {
        draft.loading = false;
        break;
      }
      case types.LOGOUT: {
        draft.loading = false;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
