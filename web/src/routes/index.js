import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Login,
  Orders,
  Recipients,
  DeliveryMans,
  DeliveryProblems,
} from '~/pages';

import Route from './Route';

export default function Routes({ changeTheme }) {
  const { theme } = useSelector(state => state.user);

  useEffect(() => {
    changeTheme(theme);
  }, [changeTheme, theme, theme.title]);

  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
      <Route path="/" isPrivate={false} exact component={Login} />
      <Route path="/app/orders" component={Orders} exact />
      <Route path="/app/delivery-mans" component={DeliveryMans} />
      <Route path="/app/delivery-problems" component={DeliveryProblems} />
      <Route path="/app/recipients" component={Recipients} />
      <Route path="*" component={() => <Redirect to="/app/orders" />} />
    </AnimatedSwitch>
  );
}

Routes.propTypes = {
  changeTheme: PropTypes.func.isRequired,
};
