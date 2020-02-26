import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import * as types from '~/store/types';
import { loginFailure, loginSuccess } from './actions';

export function* login({ payload }) {
  try {
    const { email, password } = payload;

    const { data: response } = yield call(api.post, '/auth', {
      email,
      password,
    });

    const { token, user } = response.data;
    console.tron.log(response);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, user));
    history.push('/app/orders');
  } catch (error) {
    toast.error('E-mail ou senha inválidos');
    yield put(loginFailure());
  }
}

export function setToken({ payload }) {
  const { auth } = payload;

  if (!auth) return;

  const { token } = auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logOut() {
  history.push('/');
}

export default all([
  takeLatest(types.LOGIN_REQUEST, login),
  takeLatest(types.LOGOUT, logOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
