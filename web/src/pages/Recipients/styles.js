import styled from 'styled-components';

export const StreetComponents = styled.div`
  &.street-components {
    display: flex;
    flex-direction: row;
    align-items: center !important;
    justify-content: space-between !important;
    margin-top: ${props => props.theme.spacing.margin / 2}px;

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
        margin-left: ${props => props.theme.spacing.margin}px;
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
    margin-top: ${props => props.theme.spacing.margin / 2}px;

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
        margin-left: ${props => props.theme.spacing.margin}px;
      }
    }
  }
`;

export const Info = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props =>
    `${props.theme.spacing.padding / 5}px ${props.theme.spacing.padding /
      2}px`};
  border-radius: ${props => props.theme.metrics.radius};
  background: ${props => props.theme.colors.appBackground};
  border: 1px solid ${props => props.theme.colors.borderColor};
  margin-bottom: ${props => props.theme.spacing.margin}px;

  svg {
    margin-right: ${props => props.theme.spacing.margin / 3}px;
  }

  small {
    color: ${props => props.theme.colors.secondaryTextColor};
    font-weight: bold;
  }
`;

export { EditContainer, FormHeader } from '../Orders/styles';
