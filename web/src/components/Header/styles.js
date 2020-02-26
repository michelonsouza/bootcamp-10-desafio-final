import styled from 'styled-components';

import { colors, defaults } from '~/styles/defaults';

export const Container = styled.header`
  display: flex;
  background: ${colors.light.background};
  border-bottom: 1px solid ${colors.gray};
  margin-bottom: ${defaults.spacing.margin * 2}px;
`;

export const Content = styled.div`
  height: ${defaults.metrics.height + 20}px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${defaults.spacing.padding}px;

  nav {
    display: flex;
    flex: 1;
    align-items: center;

    a.logo {
      margin-right: ${defaults.spacing.padding}px;
      padding-right: ${defaults.spacing.padding}px;
      border-right: 1px solid ${colors.light.colorLight};
      display: flex;
      align-items: center;

      img {
        width: 135px;
      }
    }

    a {
      text-transform: uppercase;
      font-weight: bold;
      color: ${colors.lightGrey};
      font-size: 15px;

      &.active {
        color: ${colors.light.colorDark};
      }

      &:not(.logo) {
        margin-right: ${defaults.spacing.margin - 5}px;
      }
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    strong {
      font-size: 14px;
      color: ${colors.light.colorDark};
    }

    button {
      border: 0;
      font-size: 14px;
      background: none;
      color: ${colors.danger};
      margin-top: ${defaults.spacing.margin - 15}px;
    }
  }
`;
