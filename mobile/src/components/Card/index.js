import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Card({ children, noPadding }) {
  return <Container noPadding={noPadding}>{children}</Container>;
}

Card.defaultProps = {
  noPadding: false,
};

Card.propTypes = {
  noPadding: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
