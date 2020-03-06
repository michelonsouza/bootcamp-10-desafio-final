import styled from 'styled-components/native';

export const ProblemList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ProblemContainer = styled.View`
  padding: ${props => props.theme.spacing.base / 2}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProblemDescription = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.textColorLight};
`;

export const DateText = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.secondaryTextColor};
`;

export const NoProblemContainer = styled.View`
  border-radius: ${props => props.theme.metrics.borderRadius};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const NoProblemText = styled.Text`
  color: ${props => props.theme.colors.secondaryTextColor};
  margin-bottom: ${props => props.theme.spacing.base / 2}px;
  font-size: 26px;
  text-align: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  border-radius: ${props => props.theme.metrics.borderRadius};
  margin: ${props => props.theme.spacing.base / 2}px
    ${props => props.theme.spacing.base}px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.theme.colors.borderColor};
`;
