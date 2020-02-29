import styled from 'styled-components';

import { colors, defaults } from '~/styles/defaults';

export const StreetComponents = styled.div`
  &.street-components {
    display: flex;
    flex-direction: row;
    align-items: center !important;
    justify-content: space-between !important;
    margin-top: ${defaults.spacing.margin / 2}px;

    @media (max-width: 899px) {
      flex-direction: column;
      justify-content: center !important;
      div {
        flex: 1;
        width: 100%;

        & + div {
          flex: 1;
          margin-left: 0 !important;
        }
      }
    }

    div {
      margin-top: 0;
      flex: 2;

      & + div {
        flex: 1;
        margin-left: ${defaults.spacing.margin}px;
      }
    }
  }
`;

export const CityComponents = styled.div`
  &.city-components {
    display: flex;
    flex-direction: row;
    align-items: center !important;
    justify-content: space-between !important;
    margin-top: ${defaults.spacing.margin / 2}px;

    @media (max-width: 899px) {
      flex-direction: column;
      justify-content: center !important;
      div {
        flex: 1;
        width: 100%;

        & + div {
          flex: 1;
          margin-left: 0 !important;
        }
      }
    }

    div {
      margin-top: 0;
      flex: 1;

      & + div {
        margin-left: ${defaults.spacing.margin}px;
      }
    }
  }
`;

export const Info = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${defaults.spacing.padding / 5}px ${defaults.spacing.padding / 2}px;
  border-radius: ${defaults.radius};
  background: ${colors.light.appBackground};
  border: 1px solid ${colors.light.colorDefault};
  margin-bottom: ${defaults.spacing.margin}px;

  svg {
    margin-right: ${defaults.spacing.margin / 3}px;
  }

  small {
    color: ${colors.light.colorDefault};
    font-weight: bold;
  }
`;

export { EditContainer, FormHeader } from '../Orders/styles';
