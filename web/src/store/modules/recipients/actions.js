import * as types from '~/store/types';

export function recipientsRequest(page) {
  return {
    type: types.RECIPIENTS_REQUEST,
    payload: { page },
  };
}

export function recipientsSuccess(data, pagination) {
  return {
    type: types.RECIPIENTS_SUCCESS,
    payload: { data, pagination },
  };
}

export function recipientCreateRequest(data) {
  return {
    type: types.CREATE_RECIPIENT,
    payload: { data },
  };
}

export function recipientUpdateRequest(data, id) {
  return {
    type: types.RECIPIENTS_UPDATE_REQUEST,
    payload: { data, id },
  };
}

export function deleteRecipient(id) {
  return {
    type: types.DELETE_RECIPIENT,
    payload: { id },
  };
}

export function recipientsFilteredRequest(query) {
  return {
    type: types.RECIPIENTS_FILTERED_REQUEST,
    payload: { query },
  };
}

export function recipientFailure() {
  return {
    type: types.RECIPIENTS_FAILURE,
  };
}
