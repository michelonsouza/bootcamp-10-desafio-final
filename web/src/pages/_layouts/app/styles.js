import styled from 'styled-components';

import { colors } from '~/styles/defaults';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.light.appBackground};
`;

export const Content = styled.div`
  width: 1200px;
  max-width: 100% !important;
  margin: 50px auto;
`;
