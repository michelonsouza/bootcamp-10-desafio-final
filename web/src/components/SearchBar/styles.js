import styled from 'styled-components';
import { darken } from 'polished';

import { colors, defaults } from '~/styles/defaults';

export const Container = styled.div`
  padding: 0 ${defaults.spacing.padding}px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h1 {
    font-size: 24px;
    color: ${colors.light.colorDark};
    margin-bottom: ${defaults.spacing.margin}px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      min-width: 250px;
      max-width: 100% !important;
    }
  }

  form {
    display: flex;

    button {
      margin-left: ${defaults.spacing.margin}px;

      &[disabled] {
        opacity: 0.6;
      }
    }
  }

  button {
    font-size: 14px;
    height: ${defaults.metrics.height}px;
    border: 0;
    border-radius: ${defaults.radius};
    padding: 0 ${defaults.spacing.padding}px;
    background: ${colors.primary};
    color: ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      background: ${darken(0.06, colors.primary)};
    }
  }
`;
