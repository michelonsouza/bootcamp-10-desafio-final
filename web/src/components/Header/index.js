import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logo from '~/assets/images/logo.png';
import { logOut } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';

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

  function handleLogOut() {
    dispatch(logOut());
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
            <img src={logo} alt="FastFeet" />
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
          <strong>Michelon Souza</strong>
          <button type="button" title="Sair do sistema" onClick={handleLogOut}>
            sair do sistema
          </button>
        </div>
      </Content>
    </Container>
  );
}

export default memo(Header);
