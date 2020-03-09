import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.appBackground};
`;

export const Content = styled.div`
  width: 1200px;
  max-width: 100% !important;
  margin: 50px auto;
`;
