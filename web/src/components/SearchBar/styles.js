import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 ${props => props.theme.spacing.padding}px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h1 {
    font-size: 24px;
    color: ${props => props.theme.colors.textColor};
    margin-bottom: ${props => props.theme.spacing.margin}px;
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
      margin-left: ${props => props.theme.spacing.margin}px;

      &[disabled] {
        opacity: 0.6;
        cursor: no-drop;
      }
    }
  }

  button {
    font-size: 14px;
    height: ${props => props.theme.metrics.height}px;
    border: 0;
    border-radius: ${props => props.theme.metrics.radius};
    padding: 0 ${props => props.theme.spacing.padding}px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      background: ${props => darken(0.06, props.theme.colors.primary)};
    }
  }

  .filter-container {
    display: flex;
    align-items: center;

    button:first-child {
      background: ${props => props.theme.colors.danger};
      margin-left: ${props => props.theme.spacing.margin / 2}px;

      &[disabled] {
        opacity: 0.6;
      }

      &:hover {
        background: ${props => darken(0.06, props.theme.colors.danger)};
      }
    }

    button:last-child {
      background: ${props => props.theme.colors.danger};
      margin-left: ${props => props.theme.spacing.margin / 2}px;

      &[disabled] {
        opacity: 0.6;
        cursor: no-drop;
      }

      &:hover {
        background: ${props => darken(0.07, props.theme.colors.danger)};
      }
    }
  }
`;
