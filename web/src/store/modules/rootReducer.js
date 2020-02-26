import { combineReducers } from 'redux';

import auth from './auth/reducer';
import orders from './orders/reducer';
import deliveryMans from './deliveryMans/reducer';

export default combineReducers({ auth, orders, deliveryMans });
