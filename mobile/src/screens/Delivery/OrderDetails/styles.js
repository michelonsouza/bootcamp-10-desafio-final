import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const ActionsContainer = styled.View`
  border-radius: ${props => props.theme.metrics.borderRadius};
  flex-direction: row;

  ${Platform.OS === 'ios'
    ? css`
        box-shadow: 0 0 6px ${props => props.theme.colors.borderColor};
      `
    : css`
        border: 2px solid ${props => props.theme.colors.borderColor};
      `}
`;

export const Action = styled.TouchableOpacity`
  background: ${props => props.theme.colors.secondaryBackground};
  padding: ${props => props.theme.spacing.base}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  ${props =>
    props.next &&
    css`
      border-color: ${props.theme.colors.borderColor};
      border-style: solid;
      border-right-width: 2px;
    `}
`;

export const ActionText = styled.Text`
  color: ${props => props.theme.colors.secondaryTextColor};
  font-size: 12px;
  text-align: center;
  margin-top: ${props => props.theme.spacing.base / 4}px;
`;
