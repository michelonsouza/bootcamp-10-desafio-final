import styled from 'styled-components';

import { defaults } from '~/styles/defaults';

export const Container = styled.div`
  flex: 1;

  & + div {
    margin-left: ${defaults.spacing.margin}px;
  }
`;
