import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  label {
    color: ${props => props.theme.colors.textColor};
  }

  & + div {
    margin-left: ${props => props.theme.spacing.margin}px;
  }
`;
