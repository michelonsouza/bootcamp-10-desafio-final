import React from 'react';

import { Header } from '~/components';

import ListHeader from './ListHeader';
import { Container, Content } from './styles';

export default function Orders() {
  return (
    <Container>
      <Content>
        <Header />
        <ListHeader />
      </Content>
    </Container>
  );
}
