import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';
import { colors, defaults } from '~/styles/defaults';

function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return {
        bg: lighten(0.4, colors.warning),
        color: colors.warning,
      };
    case 'canceled':
      return {
        bg: lighten(0.3, colors.danger),
        color: colors.danger,
      };
    case 'withdrawal':
      return {
        bg: lighten(0.3, colors.info),
        color: colors.info,
      };
    case 'delivered':
      return {
        bg: lighten(0.4, colors.success),
        color: colors.success,
      };
    default:
      return {
        bg: lighten(0.4, colors.warning),
        color: colors.warning,
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
  padding: ${defaults.spacing.padding}px;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${defaults.spacing.margin / 2}px;
  padding: ${defaults.spacing.padding / 2}px ${defaults.spacing.padding}px;

  span {
    display: flex;
    font-weight: bold;
    color: ${colors.light.colorDark};
    /* text-transform: uppercase; */
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
  border-radius: ${defaults.radius};
  align-items: center;
  background: ${colors.light.background};
  padding: ${defaults.spacing.padding / 3}px ${defaults.spacing.padding}px;
  height: ${defaults.metrics.height}px;

  & + div {
    margin-top: ${defaults.spacing.margin / 1.5}px;
  }

  span {
    display: flex;
    flex: 1;
    font-weight: normal;
    color: ${colors.light.colorDark};
    color: ${colors.light.colorDefault};

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
      top: ${defaults.spacing.margin * 1.8}px;
      padding: ${defaults.spacing.padding / 2}px;
      background: ${colors.light.background};
      border: 1px solid ${colors.light.colorLight};
      border-radius: ${defaults.radius};
      z-index: 10;
      width: 150px;
      right: -55px;
      animation: ${actionAnimate} 200ms ease forwards;

      &::before {
        content: '';
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${colors.light.background};
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
        border-bottom: 10px solid ${colors.light.colorLight};
      }

      button {
        background: none;
        color: ${colors.light.colorDefault};
        border: 0;
        display: flex;
        align-items: center;
        padding: ${defaults.spacing.margin / 2}px;

        &:first-child {
          border-top-left-radius: ${defaults.radius};
          border-top-right-radius: ${defaults.radius};
        }

        &:last-child {
          border-bottom-left-radius: ${defaults.radius};
          border-bottom-right-radius: ${defaults.radius};
        }

        &:hover {
          background: ${colors.light.appBackground};
        }

        svg {
          margin-right: 15px;
        }

        & + button {
          border-top: 1px solid ${colors.light.colorLight};
        }
      }
    }
  }
`;

export const Actions = styled.div``;

export const Status = styled.span`
  display: block;
  background: ${props => getStatusColor(props.status).bg};
  padding: ${defaults.spacing.padding / 2}px;
  height: ${defaults.metrics.height - 14}px;
  border-radius: 15px;
  display: flex;
  width: fit-content;
  align-items: center;

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => getStatusColor(props.status).color};
    margin-right: ${defaults.spacing.margin / 2}px;
  }

  span {
    color: ${props => getStatusColor(props.status).color};
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const DeliveryMans = styled.span`
  display: flex;
  align-items: center;

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

  button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${colors.primary};
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
