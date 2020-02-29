import produce from 'immer';

import * as types from '~/store/types';

const initalData = {
  loading: true,
  pagination: null,
  recipients: [],
};

export default function recipients(state = initalData, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case types.RECIPIENTS_REQUEST:
      case types.CREATE_RECIPIENT:
      case types.RECIPIENTS_UPDATE_REQUEST:
      case types.DELETE_RECIPIENT: {
        draft.loading = true;
        break;
      }
      case types.RECIPIENTS_SUCCESS: {
        draft.loading = false;
        draft.recipients = action.payload.data;
        draft.pagination = action.payload.pagination;
        break;
      }
      case types.RECIPIENTS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
