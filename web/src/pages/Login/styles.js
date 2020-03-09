import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.primary};
`;

export const Content = styled.div`
  background: ${props => props.theme.colors.white};
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.metrics.radius};
  padding: 50px 20px;

  img {
    max-width: 100%;
    width: 260px;
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: ${props => props.theme.spacing.margin * 1.5}px;
  }
`;

export const SendButton = styled.button`
  height: ${props => props.theme.metrics.height}px;
  border: 0;
  border-radius: ${props => props.theme.metrics.radius};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  margin: ${props => props.theme.spacing.padding}px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease;
  width: 100%;

  &:hover {
    background: ${props => darken(0.06, props.theme.colors.primary)};
  }
`;
