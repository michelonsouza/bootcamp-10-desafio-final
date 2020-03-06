import React from 'react';
import PropTypes from 'prop-types';

import {
  Head,
  Title,
  FilterContainer,
  FilterText,
  FilterButton,
} from '../styles';

export default function ListHeader({ active, handlefilter }) {
  return (
    <Head>
      <Title>Entregas</Title>
      <FilterContainer>
        <FilterButton
          active={active === 'pending'}
          onPress={() => handlefilter(false)}>
          <FilterText active={active === 'pending'}>Pendentes</FilterText>
        </FilterButton>
        <FilterButton
          active={active === 'delivered'}
          onPress={() => handlefilter(true)}>
          <FilterText active={active === 'delivered'}>Entregues</FilterText>
        </FilterButton>
      </FilterContainer>
    </Head>
  );
}

ListHeader.defaultProps = {
  active: 'pending',
};

ListHeader.propTypes = {
  handlefilter: PropTypes.func.isRequired,
  active: PropTypes.string,
};
