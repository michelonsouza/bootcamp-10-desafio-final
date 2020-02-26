import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Login from '~/pages/Login';
import Orders from '~/pages/Orders';
import DeliveryMans from '~/pages/DeliveryMans';
import Recipients from '~/pages/Recipients';
import DeliveryProblems from '~/pages/DeliveryProblems';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" isPrivate={false} exact component={Login} />
      <Route path="/app/orders" component={Orders} exact />
      <Route path="/app/delivery-mans" component={DeliveryMans} />
      <Route path="/app/delivery-problems" component={DeliveryProblems} />
      <Route path="/app/recipients" component={Recipients} />
      <Route path="*" component={() => <Redirect to="/app/orders" />} />
    </Switch>
  );
}
