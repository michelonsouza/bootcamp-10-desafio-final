import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';

import { colors, defaults } from '~/styles/defaults';

export const InputText = styled(InputMask)`
  height: ${defaults.metrics.height}px;
  padding: 0 10px;
  border: 1px solid ${colors.gray};
  border-radius: ${defaults.radius};
  margin-top: 10px;
  caret-color: ${colors.primary};
  color: ${colors.light.colorDefault};
  transition: all 200ms ease;

  &:focus {
    border: 2px solid ${colors.primary};
  }

  ${props =>
    props['data-icon'] &&
    css`
      padding-left: ${defaults.spacing.padding * 2.3}px;
      margin-top: ${props.label ? '10px' : 0};
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
    width: 100%;
    flex-direction: column;
    /* text-transform: uppercase; */
    font-weight: bold;
    color: ${colors.darkGray};
    font-size: 14px;
  }

  svg {
    position: absolute;
    bottom: ${props => (props.error ? '31px' : '9px')};
    left: 10px;
    margin-right: ${defaults.spacing.padding - 10}px;
  }

  span.error {
    color: ${colors.danger};
    font-size: 14px;
    margin-top: ${defaults.spacing.margin / 12}px;
  }
`;
