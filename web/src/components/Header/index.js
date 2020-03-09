import React, { memo, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';

import logo from '~/assets/images/logo.png';
import logoWhite from '~/assets/images/logo_white.png';
import { logOut } from '~/store/modules/auth/actions';
import { changeTheme } from '~/store/modules/user/actions';

import { Container, Content, SwitchButton } from './styles';

const navLinks = [
  {
    to: '/app/orders',
    label: 'Encomendas',
  },
  {
    to: '/app/delivery-mans',
    label: 'Entregadores',
  },
  {
    to: '/app/recipients',
    label: 'Destinatários',
  },
  {
    to: '/app/delivery-problems',
    label: 'Problemas',
  },
];

function Header() {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const { theme: themeSelected } = useSelector(state => state.user);

  const fastFeetLogo = useMemo(() => {
    return theme.title === 'light' ? logo : logoWhite;
  }, [theme.title]);

  function handleLogOut() {
    dispatch(logOut());
  }

  function togleTheme() {
    const newTheme = themeSelected === 'light' ? 'dark' : 'light';
    dispatch(changeTheme(newTheme));
  }

  return (
    <Container>
      <Content>
        <nav>
          <NavLink
            to="/app/orders"
            title="FastFeet"
            className="logo"
            activeClassName="active"
          >
            <img src={fastFeetLogo} alt="FastFeet" />
          </NavLink>

          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              activeClassName="active"
              title={link.label}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div>
          <SwitchButton
            type="button"
            className="switch-container"
            value={themeSelected}
            onClick={togleTheme}
          >
            <span className="switch-circle">
              {themeSelected === 'light' ? 'off' : 'on'}
            </span>
          </SwitchButton>

          <div className="user-info">
            <strong>Michelon Souza</strong>
            <button
              type="button"
              title="Sair do sistema"
              onClick={handleLogOut}
            >
              sair do sistema
            </button>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default memo(Header);
