import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  margin-bottom: ${props => props.theme.spacing.margin * 2}px;
`;

export const Content = styled.div`
  height: ${props => props.theme.metrics.height + 20}px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.padding}px;

  nav {
    display: flex;
    flex: 1;
    align-items: center;

    a.logo {
      margin-right: ${props => props.theme.spacing.padding}px;
      padding-right: ${props => props.theme.spacing.padding}px;
      border-right: 1px solid ${props => props.theme.colors.borderColor};
      display: flex;
      align-items: center;

      img {
        width: 135px;
      }
    }

    a {
      text-transform: uppercase;
      font-weight: bold;
      color: ${props => props.theme.colors.secondaryTextColor};
      font-size: 15px;

      &.active {
        color: ${props => props.theme.colors.textColor};
      }

      &:not(.logo) {
        margin-right: ${props => props.theme.spacing.margin - 5}px;
      }
    }
  }

  div {
    display: flex;
    align-items: center;

    > div.user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: ${props => props.theme.spacing.margin}px;
      padding-left: ${props => props.theme.spacing.margin}px;
      border-left: 1px solid ${props => props.theme.colors.borderColor};

      strong {
        font-size: 14px;
        color: ${props => props.theme.colors.textColor};
      }

      button {
        border: 0;
        font-size: 14px;
        background: none;
        color: ${props => props.theme.colors.danger};
        margin-top: ${props => props.theme.spacing.margin - 15}px;
      }
    }
  }
`;

export const SwitchButton = styled.button`
  border: 0;
  height: 30px;
  border-radius: 15px;
  background: ${props =>
    props.theme.colors[props.value === 'light' ? 'lightGrey' : 'primary']};
  display: flex;
  width: 50px;
  padding: 3px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: ${props => props.theme.colors.white};
    color: ${props =>
      props.theme.colors[props.value === 'light' ? 'lightGrey' : 'primary']};
    margin-left: ${props => (props.value === 'dark' ? 'calc(100% - 24px)' : 0)};
    transition: all 200ms ease-in-out;
    font-size: 12px;
    font-weight: bold;
  }
`;
