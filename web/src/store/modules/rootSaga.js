import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import orders from './orders/sagas';

export default function* rootSaga() {
  return yield all([auth, orders]);
}
