import styled, { keyframes } from 'styled-components';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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

  + div {
    position: absolute;
    left: calc(50vw - 100px);
    top: calc(50vh - 100px);
    z-index: 110;
  }
`;
