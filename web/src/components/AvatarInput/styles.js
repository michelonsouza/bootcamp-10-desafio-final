import styled from 'styled-components';
import { lighten } from 'polished';

import { colors, defaults } from '~/styles/defaults';

export const Container = styled.div`
  > label {
    cursor: pointer;
    width: 150px;
    display: block;
    margin: 0 auto ${defaults.spacing.margin}px auto;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${props =>
        lighten(0.55, props.color || colors.light.colorLight)};
      margin: 0;
    }

    input {
      display: none;
    }
  }
`;

export const AltAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => lighten(0.55, props.color || colors.light.colorLight)};
  position: relative;
  flex-direction: ${props => (props.column ? 'column' : 'row')};

  p {
    color: ${colors.light.colorLight};
    font-weight: bold;
  }

  &:hover {
    &::before {
      border-color: ${colors.primary};
    }
  }

  &::before {
    content: '';
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px dashed ${props => props.color || colors.light.colorLight};
    position: absolute;
    transition: all 200ms ease;
  }

  span {
    font-size: 66px;
    color: ${props => props.color || colors.light.colorLight};
  }
`;
