import styled from 'styled-components/native';

function getBackground({ theme, variant = 'success' }) {
  return theme.colors[variant];
}

export const Container = styled.TouchableOpacity`
  height: ${props => props.theme.metrics.formElementsHeight};
  border-radius: ${props => props.theme.metrics.borderRadius};
  background: ${props => getBackground(props)};
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin: 15px 0;
  width: 100%;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
