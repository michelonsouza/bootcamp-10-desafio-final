import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Wrapper, Content } from './styles';

export default function AppLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
