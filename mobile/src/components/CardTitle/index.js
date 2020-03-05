import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { TitleContainer, Title } from './styles';

export default function CardTitle({ icon, title }) {
  const theme = useContext(ThemeContext);

  return (
    <TitleContainer>
      <Icon name={icon} size={24} color={theme.colors.primary} />
      <Title>{title}</Title>
    </TitleContainer>
  );
}

CardTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
