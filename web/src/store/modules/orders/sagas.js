import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as types from '~/store/types';

import { ordersSuccess, orderFailure } from './actions';

export function* getOrders({ payload }) {
  try {
    const { page = 1 } = payload;
    const { data: response } = yield call(api.get, '/orders', {
      params: {
        page,
      },
    });

    yield put(ordersSuccess(response.data, response.pagination));
  } catch (error) {
    yield put(orderFailure());
    toast.error('Erro 500: Problema no servidor :(');
  }
}

export function* ordersFiltered({ payload }) {
  try {
    const { query } = payload;

    const { data: response } = yield call(api.get, '/orders', {
      params: {
        q: query,
      },
    });

    yield put(ordersSuccess(response.data, response.pagination));
  } catch (error) {
    yield put(orderFailure());
    toast.error('Erro 500: Problema no servidor :(');
  }
}

export function* orderUpdate({ payload }) {
  try {
    const { id, data } = payload;
    const { orders, pagination } = yield select(state => state.orders);

    const { data: response } = yield call(api.put, `/orders/${id}`, data);

    const ordersChanged = orders.map(o => (o.id === id ? response.data : o));

    toast.success(`Encomenda #${id} atualizada com sucesso`);
    yield put(ordersSuccess(ordersChanged, pagination));
  } catch (error) {
    yield put(orderFailure());
    toast.error('Erro 500: Problema no servidor :(');
  }
}

export function* createOrder({ payload }) {
  try {
    const { data } = payload;

    const { data: response } = yield call(api.post, '/orders', data);

    toast.success(`Encomenda #${response.id} cadastrada com sucesso`);
    yield getOrders({ payload: {} });
  } catch (error) {
    yield put(orderFailure());
    toast.error('Erro ao cadastrar a encomenda');
  }
}

export function* cancelOrder({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/orders/${id}`);

    toast.success(`Encomenda #${id} cancelada com sucesso`);
    yield getOrders({ payload: {} });
  } catch (error) {
    yield put(orderFailure());
    toast.error('Erro ao cancelar a encomenda');
  }
}

export default all([
  takeLatest(types.ORDERS_REQUEST, getOrders),
  takeLatest(types.ORDERS_FILTERED, ordersFiltered),
  takeLatest(types.UPDATE_ORDER_REQUEST, orderUpdate),
  takeLatest(types.CREATE_ORDER, createOrder),
  takeLatest(types.CANCEL_ORDER_REQUEST, cancelOrder),
]);
