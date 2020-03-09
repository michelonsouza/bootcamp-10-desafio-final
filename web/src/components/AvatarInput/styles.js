import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  > label {
    cursor: pointer;
    width: 150px;
    display: block;
    margin: 0 auto ${props => props.theme.spacing.margin}px auto;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${props =>
        props.color
          ? lighten(0.55, props.color)
          : props.theme.colors.background};
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
  background: ${props =>
    props.color ? lighten(0.55, props.color) : props.theme.colors.background};
  position: relative;
  flex-direction: ${props => (props.column ? 'column' : 'row')};

  p {
    color: ${props => props.theme.colors.secondaryTextColor};
    font-weight: bold;
  }

  &:hover {
    &::before {
      border-color: ${props => props.theme.colors.primary};
    }
  }

  &::before {
    content: '';
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px dashed ${props => props.color || props.theme.colors.borderColor};
    position: absolute;
    transition: all 200ms ease;
  }

  span {
    font-size: 66px;
    color: ${props => props.color || props.theme.colors.borderColor};
  }
`;
