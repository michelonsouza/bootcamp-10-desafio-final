import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as types from '~/store/types';

import { recipientsSuccess, recipientFailure } from './actions';

export function* getRecipients({ payload }) {
  try {
    const { page = 1 } = payload;
    const { data: response } = yield call(api.get, '/recipients', {
      params: {
        page,
      },
    });
    const { data, pagination } = response;
    yield put(recipientsSuccess(data, pagination));
  } catch (error) {
    toast.error('Erro 500: Internal server error');
    yield put(recipientFailure());
  }
}

export function* filteredRecipients({ payload }) {
  try {
    const { query } = payload;
    const { data: response } = yield call(api.get, '/recipients', {
      params: {
        q: query,
      },
    });

    yield put(recipientsSuccess(response.data, response.pagination));
  } catch (error) {
    yield put(recipientFailure());
    toast.error('Erro ao recuperar destinatários');
  }
}

export function* createRecipient({ payload }) {
  try {
    const { data } = payload;
    const { data: response } = yield call(api.post, '/recipients', data);

    yield getRecipients({ payload: {} });
    toast.success(`Destinatário ${response.data.name} cadastrado com sucesso`);
  } catch (error) {
    yield put(recipientFailure());
    toast.error('Erro ao cadastrar destinatário');
  }
}

export function* updateRecipients({ payload }) {
  try {
    const { data, id } = payload;
    const { data: response } = yield call(api.put, `/recipients/${id}`, data);

    yield getRecipients({ payload: {} });
    toast.success(`Destinatário ${response.data.name} atualizado com sucesso`);
  } catch (error) {
    yield put(recipientFailure());
    toast.error('Erro ao atualizar destinatário');
  }
}

export function* deleteRecipient({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/recipients/${id}`);

    yield getRecipients({ payload: {} });
    toast.success(`Destinatário #${id} deletado com sucesso`);
  } catch (error) {
    yield put(recipientFailure());
    toast.error('Erro ao excluir o destinatário');
  }
}

export default all([
  takeLatest(types.RECIPIENTS_REQUEST, getRecipients),
  takeLatest(types.CREATE_RECIPIENT, createRecipient),
  takeLatest(types.RECIPIENTS_UPDATE_REQUEST, updateRecipients),
  takeLatest(types.DELETE_RECIPIENT, deleteRecipient),
  takeLatest(types.RECIPIENTS_FILTERED_REQUEST, filteredRecipients),
]);
