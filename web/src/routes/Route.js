import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppLayout from '~/pages/_layouts/app';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/app/orders" />;
  }

  const Layout = signed ? AppLayout : props => <>{props.children}</>;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.defaultProps = {
  isPrivate: true,
  children: null,
};

RouteWrapper.propTypes = {
  children: PropTypes.element,
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
