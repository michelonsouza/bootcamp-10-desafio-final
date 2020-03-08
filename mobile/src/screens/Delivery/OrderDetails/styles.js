import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  margin-bottom: 50px;
`;

export const ActionsContainer = styled.View`
  border-radius: ${props => props.theme.metrics.borderRadius};
  flex-direction: row;

  ${props =>
    props.theme.title === 'light' && Platform.OS === 'ios'
      ? css`
          box-shadow: 0 0 6px ${props.theme.colors.borderColor};
        `
      : css`
          border: 2px solid ${props.theme.colors.borderColor};
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

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Signature = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: ${props => props.theme.metrics.borderRadius};
`;
