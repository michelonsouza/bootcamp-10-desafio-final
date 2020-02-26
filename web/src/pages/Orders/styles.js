import styled, { keyframes } from 'styled-components';

import { colors, defaults } from '~/styles/defaults';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const slideAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${fadeAnimation} 200ms ease forwards;
  opacity: 0;
`;

export const Content = styled.div`
  background: ${colors.light.background};
  border-radius: ${defaults.radius};
  padding: ${defaults.spacing.padding}px;
  width: 350px;
  max-width: 100% !important;
  animation: ${slideAnimation} 300ms ease-in-out forwards;
  opacity: 0;
  position: absolute;
  z-index: 101;
  margin: auto;
  top: 30%;
  left: calc(50% - 175px);

  div {
    margin-top: ${defaults.spacing.margin}px;

    img {
      max-width: 100%;
    }
  }
`;

export const EditContainer = styled.div`
  margin: ${defaults.spacing.margin}px;
  width: 900px;
  max-width: 100% !important;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    padding: ${defaults.spacing.padding}px;
    background: ${colors.light.background};
    border-radius: ${defaults.radius};

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & + div {
        margin-top: ${defaults.spacing.margin}px;

        label {
          flex: 1;
        }
      }
    }
  }
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${defaults.spacing.margin}px;

  h1 {
    font-size: 24px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      height: ${defaults.metrics.height}px;
      padding: 0 ${defaults.spacing.padding}px;
      border-radius: ${defaults.radius};
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-weight: bold;
      color: ${colors.white};
      font-size: 14px;

      &:hover {
        opacity: 0.9;
      }

      svg {
        margin-right: ${defaults.spacing.margin / 3}px;
      }

      &:first-child {
        background: ${colors.light.colorDefault};
      }

      &:last-child {
        background: ${colors.primary};
        margin-left: ${defaults.spacing.margin}px;
      }
    }
  }
`;
