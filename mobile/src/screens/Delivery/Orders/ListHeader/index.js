import React from 'react';

import {
  Head,
  Title,
  FilterContainer,
  FilterText,
  FilterButton,
} from '../styles';

export default function LIstHeader() {
  return (
    <Head>
      <Title>Entregas</Title>
      <FilterContainer>
        <FilterButton active onPress={() => {}}>
          <FilterText active>Pendentes</FilterText>
        </FilterButton>
        <FilterButton onPress={() => {}}>
          <FilterText>Entregues</FilterText>
        </FilterButton>
      </FilterContainer>
    </Head>
  );
}
