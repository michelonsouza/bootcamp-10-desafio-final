import styled from 'styled-components/native';

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.base / 2}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size: 14px;
  margin-left: ${props => props.theme.spacing.base / 2}px;
`;
