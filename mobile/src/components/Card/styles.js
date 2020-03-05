import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  border-radius: ${props => props.theme.metrics.borderRadius};
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.borderColor};
  padding: ${props => props.theme.spacing.base / 2}px
    ${props => props.theme.spacing.base}px;
  margin-bottom: ${props => props.theme.spacing.base * 0.5}px;
`;
