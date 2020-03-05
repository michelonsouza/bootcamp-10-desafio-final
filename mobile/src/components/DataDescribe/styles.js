import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => (props.last ? 0 : props.theme.spacing.base)}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.secondaryTextColor};
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.base / 4}px;
`;

export const DataText = styled.Text`
  color: ${props => props.theme.colors.textColorLight};
  font-size: 14px;
`;
