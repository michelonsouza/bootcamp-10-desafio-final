import React, { useMemo, useContext } from 'react';
import { StatusBar } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { Container, BackHeader, Content, Title } from './styles';

export default function OrdersLayout({ title, children }) {
  const theme = useContext(ThemeContext);
  const isDark = useDarkMode();

  const background = useMemo(() => {
    return theme.colors[isDark ? 'secondaryBackground' : 'primary'];
  }, [isDark, theme.colors]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={background} />
      <BackHeader />
      {title && <Title>{title}</Title>}
      <Content title={title}>{children}</Content>
    </Container>
  );
}

OrdersLayout.defaultProps = {
  title: null,
};

OrdersLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  title: PropTypes.string,
};
