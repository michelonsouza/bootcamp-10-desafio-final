import styled from 'styled-components';
import { darken } from 'polished';

import { defaults, colors } from '~/styles/defaults';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
`;

export const Content = styled.div`
  background: ${colors.light.background};
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${defaults.radius};
  padding: ${defaults.spacing.loginPadding};

  img {
    max-width: 100%;
    width: 260px;
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: ${defaults.spacing.margin * 1.5}px;
  }
`;

export const SendButton = styled.button`
  height: ${defaults.metrics.height}px;
  border: 0;
  border-radius: ${defaults.radius};
  background: ${colors.primary};
  color: ${colors.white};
  font-weight: bold;
  margin: ${defaults.spacing.padding}px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease;
  width: 100%;

  &:hover {
    background: ${darken(0.06, colors.primary)};
  }
`;
