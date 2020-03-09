import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';

export const InputText = styled(InputMask)`
  height: ${props => props.theme.metrics.height}px;
  padding: 0 10px;
  border: 1px solid
    ${props =>
      props.theme.colors[
        props.excepttheme === 'true' ? 'gray' : 'borderColor'
      ]};
  border-radius: ${props => props.theme.metrics.radius};
  background: ${props =>
    props.theme.colors[props.excepttheme === 'true' ? 'white' : 'background']};
  margin-top: 10px;
  caret-color: ${props => props.theme.colors.primary};
  color: ${props =>
    props.theme.colors[
      props.excepttheme === 'true' ? 'lightGrey' : 'textColor'
    ]};
  transition: all 200ms ease;

  &:focus {
    border: 2px solid ${props => props.theme.colors.primary};
  }

  ${props =>
    props['data-icon'] &&
    css`
      padding-left: ${props.theme.spacing.padding * 2.3}px;
      margin-top: ${props.label ? '10px' : 0};
    `}

  &::placeholder {
    color: ${props =>
      props.theme.colors[
        props.excepttheme === 'true' ? 'lightGrey' : 'secondaryTextColor'
      ]};
  }
`;

export const InputGroup = styled.div`
  ${props =>
    props.icon &&
    css`
      position: relative;
    `};

  & + div {
    margin-top: ${props => props.theme.spacing.margin}px;
  }

  label {
    display: flex;
    width: 100%;
    flex-direction: column;
    /* text-transform: uppercase; */
    font-weight: bold;
    color: ${props =>
      props.theme.colors[
        props.excepttheme === 'true' ? 'darkGrey' : 'textColor'
      ]};
    font-size: 14px;
  }

  svg {
    position: absolute;
    bottom: ${props => (props.error ? '31px' : '9px')};
    left: 10px;
    margin-right: ${props => props.theme.spacing.padding - 10}px;
  }

  span.error {
    color: ${props => props.theme.colors.danger};
    font-size: 14px;
    margin-top: ${props => props.theme.spacing.margin / 12}px;
  }
`;
