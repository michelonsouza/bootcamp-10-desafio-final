import styled from 'styled-components/native';

import light from '~/themes/light';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${light.colors.primary};
  padding: 20px;
`;

export const Form = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const Logo = styled.Image`
  width: 244px;
  height: 48px;
  margin-bottom: 40px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: light.colors.secondaryTextColor,
})`
  height: ${light.metrics.formElementsHeight};
  border-radius: ${light.metrics.borderRadius};
  background: #fff;
  color: #444;
  padding: 0 20px;
  align-self: stretch;
`;
