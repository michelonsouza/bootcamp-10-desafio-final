import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

function getBackground({ theme, variant = 'success' }) {
  return theme.colors[variant];
}

export const Container = styled(RectButton)`
  height: ${props => props.theme.metrics.formElementsHeight};
  border-radius: ${props => props.theme.metrics.borderRadius};
  background: ${props => getBackground(props)};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin: 15px 0;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
