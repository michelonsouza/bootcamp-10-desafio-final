import React from 'react';
import { Form } from '@unform/web';

import logo from '~/assets/images/logo.png';
import { Container, Content, SendButton } from './styles';
import Input from '~/components/Input';

export default function Login() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />
        <Form>
          <Input
            name="email"
            label="Seu E-mail"
            type="email"
            placeholder="example@email.com"
          />
          <Input
            name="password"
            label="Sua Senha"
            type="password"
            placeholder="************"
          />

          <SendButton type="submit">Enviar no sistema</SendButton>
        </Form>
      </Content>
    </Container>
  );
}
