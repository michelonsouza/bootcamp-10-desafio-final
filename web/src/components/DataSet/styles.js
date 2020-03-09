import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

function getStatusColor(theme, status) {
  switch (status) {
    case 'pending':
      return {
        bg: lighten(0.4, theme.colors.warning),
        color: theme.colors.warning,
      };
    case 'canceled':
      return {
        bg: lighten(0.3, theme.colors.danger),
        color: theme.colors.danger,
      };
    case 'withdrawal':
      return {
        bg: lighten(0.3, theme.colors.info),
        color: theme.colors.info,
      };
    case 'delivered':
      return {
        bg: lighten(0.4, theme.colors.success),
        color: theme.colors.success,
      };
    default:
      return {
        bg: lighten(0.4, theme.colors.warning),
        color: theme.colors.warning,
      };
  }
}

const actionAnimate = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  padding: ${props => props.theme.spacing.padding}px;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.margin / 2}px;
  padding: ${props =>
    `${props.theme.spacing.padding / 2}px ${props.theme.spacing.padding}px`};

  span {
    display: flex;
    font-weight: bold;
    color: ${props => props.theme.colors.textColor};
    flex: 1;

    &:not(:first-child) {
      flex: 2;
    }

    &.actions {
      flex: 2;
      justify-content: flex-end;
    }
  }
`;

export const DataList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataItem = styled.div`
  display: flex;
  border-radius: ${props => props.theme.metrics.radius};
  align-items: center;
  background: ${props => props.theme.colors.background};
  padding: ${props =>
    `${props.theme.spacing.padding / 3}px ${props.theme.spacing.padding}px`};
  height: ${props => props.theme.metrics.height}px;

  & + div {
    margin-top: ${props => props.theme.spacing.margin / 1.5}px;
  }

  span {
    display: flex;
    flex: 1;
    font-weight: normal;
    color: ${props => props.theme.colors.secondaryTextColor};

    &:not(:first-child) {
      flex: 2;
    }
  }

  > div {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    position: relative;

    button.actions {
      display: flex;
      background: none;
      border: 0;
      display: flex;
      align-items: center;
      position: relative;

      svg {
        transform: translateY(2px);
      }
    }

    div {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: ${props => props.theme.spacing.margin * 1.8}px;
      padding: ${props => props.theme.spacing.padding / 2}px;
      background: ${props => props.theme.colors.background};
      border: 1px solid ${props => props.theme.colors.borderColor};
      border-radius: ${props => props.theme.metrics.radius};
      z-index: 10;
      width: 230px;
      right: -94px;
      animation: ${actionAnimate} 200ms ease forwards;

      &::before {
        content: '';
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${props => props.theme.colors.background};
        width: 0;
        height: 0;
        top: -10px;
        position: absolute;
        z-index: 11;
        left: calc(50% - 5px);
      }

      &::after {
        content: '';
        position: absolute;
        left: calc(50% - 5px);
        width: 0;
        height: 0;

        z-index: 10;
        top: -11px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${props => props.theme.colors.borderColor};
      }

      button {
        background: none;
        color: ${props => props.theme.colors.secondaryTextColor};
        border: 0;
        display: flex;
        align-items: center;
        padding: ${props => props.theme.spacing.margin / 2}px;

        &:first-child {
          border-top-left-radius: ${props => props.theme.metrics.radius};
          border-top-right-radius: ${props => props.theme.metrics.radius};
        }

        &:last-child {
          border-bottom-left-radius: ${props => props.theme.metrics.radius};
          border-bottom-right-radius: ${props => props.theme.metrics.radius};
        }

        &:hover {
          background: ${props => props.theme.colors.appBackground};
        }

        svg {
          margin-right: 15px;
        }

        & + button {
          border-top: 1px solid ${props => props.theme.colors.borderColor};
        }
      }
    }
  }
`;

export const Actions = styled.div``;

export const Status = styled.span`
  display: block;
  background: ${props => getStatusColor(props.theme, props.status).bg};
  padding: ${props => props.theme.spacing.padding / 2}px;
  height: ${props => props.theme.metrics.height - 14}px;
  border-radius: 15px;
  display: flex;
  width: fit-content;
  align-items: center;

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => getStatusColor(props.theme, props.status).color};
    margin-right: ${props => props.theme.spacing.margin / 2}px;
  }

  span {
    color: ${props => getStatusColor(props.theme, props.status).color};
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const DeliveryMans = styled.span`
  display: flex;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    background: ${props => lighten(0.6, props.color)};
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
    color: ${props => props.color};
    padding: 16px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  margin: 10px auto;

  span {
    color: ${props => props.theme.colors.textColor};
  }

  button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    border: 0;

    &:hover {
      opacity: 0.7;
    }

    &[disabled] {
      opacity: 0.6;
      cursor: no-drop;
    }
  }
`;
