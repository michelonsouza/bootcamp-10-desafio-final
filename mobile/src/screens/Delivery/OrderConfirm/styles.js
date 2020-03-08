import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  height: ${height - 300}px;
  padding-top: 0;
  border-radius: ${props => props.theme.metrics.borderRadius};
  overflow: hidden;
`;

export const Camera = styled(RNCamera)`
  border-radius: ${props => props.theme.metrics.borderRadius};
  flex: 1;
`;
