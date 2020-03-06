import styled from 'styled-components/native';

export const InputText = styled.TextInput.attrs(props => ({
  textAlignVertical: 'top',
  placeholderTextColor: props.theme.colors.secondaryTextColor,
}))`
  border: 2px solid ${props => props.theme.colors.borderColor};
  color: ${props => props.theme.colors.textColor};
  padding: ${props => props.theme.spacing.base}px;
  border-radius: ${props => props.theme.metrics.borderRadius};
  flex: 0.8;
  max-height: 350px;
  font-size: 20px;
`;
