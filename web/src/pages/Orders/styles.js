import styled, { keyframes } from 'styled-components';

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
  background: ${props =>
    props.theme.title === 'light'
      ? 'rgba(0, 0, 0, 0.5)'
      : 'rgba(255, 255, 255, 0.3)'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${fadeAnimation} 200ms ease forwards;
  opacity: 0;
`;

export const Content = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.metrics.radius};
  padding: ${props => props.theme.spacing.padding}px;
  width: 350px;
  max-width: 100% !important;
  animation: ${slideAnimation} 300ms ease-in-out forwards;
  opacity: 0;
  position: absolute;
  z-index: 101;
  margin: auto;
  top: 30%;
  left: calc(50% - 175px);

  p {
    color: ${props => props.theme.colors.secondaryTextColor};
  }

  div {
    margin-top: ${props => props.theme.spacing.margin}px;

    img {
      max-width: 100%;
    }
  }
`;

export const EditContainer = styled.div`
  margin: ${props => props.theme.spacing.margin}px;
  width: 900px;
  max-width: 100% !important;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    padding: ${props => props.theme.spacing.padding}px;
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.metrics.radius};

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & + div {
        margin-top: ${props => props.theme.spacing.margin}px;

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
  margin-bottom: ${props => props.theme.spacing.margin}px;

  h1 {
    font-size: 24px;
    color: ${props => props.theme.colors.textColor};
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      height: ${props => props.theme.metrics.height}px;
      padding: 0 ${props => props.theme.spacing.padding}px;
      border-radius: ${props => props.theme.metrics.radius};
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-weight: bold;
      color: ${props => props.theme.colors.white};
      font-size: 14px;

      &:hover {
        opacity: 0.9;
      }

      svg {
        margin-right: ${props => props.theme.spacing.margin / 3}px;
      }

      &:first-child {
        background: ${props => props.theme.colors.gray};
        color: ${props =>
          props.theme.colors[
            props.theme.title === 'light' ? 'white' : 'darkGray'
          ]};
      }

      &:last-child {
        background: ${props => props.theme.colors.primary};
        margin-left: ${props => props.theme.spacing.margin}px;
      }
    }
  }
`;
