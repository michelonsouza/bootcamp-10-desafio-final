import { combineReducers } from 'redux';

import auth from './auth/reducer';
import orders from './orders/reducer';
import deliverymans from './deliverymans/reducer';
import recipients from './recipients/reducer';
import problems from './problems/reducer';

export default combineReducers({
  auth,
  orders,
  deliverymans,
  recipients,
  problems,
});
