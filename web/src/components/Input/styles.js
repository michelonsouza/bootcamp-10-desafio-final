import styled, { css } from 'styled-components';

import { colors, defaults } from '~/styles/defaults';

export const InputText = styled.input`
  height: ${defaults.metrics.height}px;
  padding: 0 10px;
  border: 1px solid ${colors.gray};
  border-radius: ${defaults.radius};
  margin-top: 10px;
  caret-color: ${colors.primary};
  color: ${colors.light.colorDefault};

  ${props =>
    props.icon &&
    css`
      padding-left: ${defaults.spacing.padding * 2}px;
      margin-top: 0;
    `}

  &::placeholder {
    color: ${colors.lightGrey};
  }
`;

export const InputGroup = styled.div`
  ${props =>
    props.icon &&
    css`
      position: relative;
    `};

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

  svg {
    position: absolute;
    bottom: 9px;
    left: 10px;
    margin-right: ${defaults.spacing.padding - 10}px;
  }

  span.error {
    color: ${colors.danger};
    font-size: 14px;
    margin-top: ${defaults.spacing.margin / 12}px;
  }
`;
