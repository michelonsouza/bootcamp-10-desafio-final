import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as types from '~/store/types';
import { problemsSuccess, problemsFailure } from './actions';

export function* getProblems({ payload }) {
  try {
    const { page = 1 } = payload;
    const { data: response } = yield call(api.get, '/delivery/problems', {
      params: {
        page,
      },
    });

    yield put(problemsSuccess(response.data));
  } catch (error) {
    yield put(problemsFailure());
    toast.error('Error 500: Internal server error');
  }
}

export function* cancelDelivery({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/problem/${id}/cancel-delivery`);

    yield getProblems({ payload: {} });
    toast.success('Encomenda cancelada com sucesso');
  } catch (error) {
    yield put(problemsFailure());
    toast.error('Erro ao cancelar a encomenda');
  }
}

export default all([
  takeLatest(types.PROBLEMS_REQUEST, getProblems),
  takeLatest(types.PROBLEMS_CANCEL_DELIVERY, cancelDelivery),
]);
