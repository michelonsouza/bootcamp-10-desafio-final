import { all, put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import * as types from '~/store/types';
import { loginSuccess, loginFailure } from './actions';

export function* login({ payload }) {
  try {
    const { id } = payload;

    const { data: response } = yield call(api.post, '/auth/deliveryman', {
      id,
    });

    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure());
    Alert.alert('Error', 'Entregador não cadastrado');
  }
}

export default all([takeLatest(types.LOGIN_REQUEST, login)]);
