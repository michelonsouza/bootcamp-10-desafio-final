import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as types from '~/store/types';

import { deliverymansSuccess, updateDeliverymanFailure } from './actions';

export function* getDeliverymans({ payload }) {
  try {
    const { page = 1 } = payload;

    const { data: response } = yield call(api.get, '/deliverymans', {
      params: {
        page,
      },
    });
    const { data, pagination } = response;

    yield put(deliverymansSuccess(data, pagination));
  } catch (error) {
    toast.error('Erro 500: Internal server error :(');
  }
}

export function* createDeliveryman({ payload }) {
  try {
    const { data } = payload;
    const { data: response } = yield call(api.post, '/deliverymans', data);

    toast.success(`Entregador #${response.data.name} cadastrado com sucesso`);
    yield getDeliverymans({ payload: {} });
  } catch (error) {
    const { error: resError } = error.response.data;
    if (resError.type === 'unauthorized') {
      toast.error('Entregador já cadastrado na base de dados');
    } else {
      toast.error('Erro 500: Internal server error');
    }

    yield put(updateDeliverymanFailure());
  }
}

export function* deleteDeliveryman({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/deliverymans/${id}`);

    const { deliverymans, pagination } = yield select(
      state => state.deliverymans
    );

    yield put(
      deliverymansSuccess(
        deliverymans.filter(d => d.id !== id),
        pagination
      )
    );

    toast.success(`Entregador #${id} excluído com sucesso`);
  } catch (error) {
    toast.error('Erro 500: Internal server error');
    yield put(updateDeliverymanFailure());
  }
}

export function* updateDeliveryman({ payload }) {
  try {
    const { data, id } = payload;

    const { data: response } = yield call(api.put, `/deliverymans/${id}`, data);

    yield getDeliverymans({ payload: {} });

    toast.success(`Entregador ${response.data.name} atualizado com sucesso`);
  } catch (error) {
    const { error: resError } = error.response.data;
    if (resError.type === 'unauthorized') {
      toast.error('E-mail já cadastrado na base de dados');
    } else {
      toast.error('Erro 500: Internal server error');
    }
  }
}

export function* deliverymanFilter({ payload }) {
  try {
    const { query } = payload;
    const { data: response } = yield call(api.get, '/deliverymans', {
      params: {
        q: query,
      },
    });
    const { data, pagination } = response;

    yield put(deliverymansSuccess(data, pagination));
  } catch (error) {}
}

export default all([
  takeLatest(types.DELIVERYMANS_REQUEST, getDeliverymans),
  takeLatest(types.CREATE_DELIVERYMAN, createDeliveryman),
  takeLatest(types.UPDATE_DELIVERYMAN_REQUEST, updateDeliveryman),
  takeLatest(types.DELETE_DELIVERYMAN, deleteDeliveryman),
  takeLatest(types.DELIVERYMANS_FILTER_REQUEST, deliverymanFilter),
]);
