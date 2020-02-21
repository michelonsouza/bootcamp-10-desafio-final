import styled from 'styled-components';

import { colors, defaults } from '~/styles/defaults';

export const InputText = styled.input`
  height: ${defaults.metrics.height}px;
  padding: 0 10px;
  border: 1px solid ${colors.gray};
  border-radius: ${defaults.radius};
  margin-top: 10px;

  &::placeholder {
    color: ${colors.lightGrey};
  }
`;

export const InputGroup = styled.div`
  & + div {
    margin-top: ${defaults.spacing.margin}px;
  }

  label {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;
    font-weight: bold;
    color: ${colors.darkGray};
    font-size: 14px;
  }
`;
