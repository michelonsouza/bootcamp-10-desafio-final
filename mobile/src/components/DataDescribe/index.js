import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title, DataText } from './styles';

export default function DataDescribe({ title, data, last }) {
  return (
    <Container last={last}>
      <Title>{title}</Title>
      <DataText>{data}</DataText>
    </Container>
  );
}

DataDescribe.defaultProps = {
  last: false,
};

DataDescribe.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  last: PropTypes.bool,
};
