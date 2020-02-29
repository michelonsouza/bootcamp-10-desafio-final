import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import orders from './orders/sagas';
import deliverymans from './deliverymans/sagas';
import recipients from './recipients/sagas';
import problems from './problems/sagas';

export default function* rootSaga() {
  return yield all([auth, orders, deliverymans, recipients, problems]);
}
