import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
function contentWidth(base) {
  return width - base * 2;
}

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
  enabled: true,
})`
  flex: 1;
  position: relative;
  background: ${props => props.theme.colors.background};
`;

export const BackHeader = styled.View`
  background: ${props =>
    props.theme.colors[
      props.theme.title === 'light' ? 'primary' : 'secondaryBackground'
    ]};
  height: 100px;
`;

export const Content = styled.View`
  border-radius: ${props => props.theme.metrics.borderRadius};
  /* background: ${props => props.theme.colors.background}; */
  margin: 0 ${props => props.theme.spacing.base}px;
  top: ${props => props.theme.spacing.base * (props.title ? 3 : 1.5)}px;
  position: absolute;
  width: ${props => contentWidth(props.theme.spacing.base)}px;
  height: 100%;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${props =>
    props.theme.title === 'light' ? '#fff' : props.theme.colors.primary};
  position: absolute;
  text-align: center;
  top: ${props => props.theme.spacing.base}px;
  left: 0;
  width: 100%;
`;
