import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import Spinner from 'react-spinner-material';
import * as Yup from 'yup';
import { MdEmail, MdLock } from 'react-icons/md';

import { colors } from '~/styles/defaults';
import { loginRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.png';
import Input from '~/components/Input';

import { Container, Content, SendButton } from './styles';

export default function Login() {
  const formref = useRef(null);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  async function handleSubimit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Formato de e-mail inválido')
          .required('E-mail é obrigatório'),
        password: Yup.string()
          .min(6, 'Senha deve ter, no mínimo, 6 caracteres')
          .required('Senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formref.current.setErrors({});

      const { email, password } = data;

      dispatch(loginRequest(email, password));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formref.current.setErrors(errorMessages);
      }
    }
    // dispatch(loginRequest(email, password));
    console.tron.log(data);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />
        <Form ref={formref} onSubmit={handleSubimit}>
          <Input
            icon={MdEmail}
            name="email"
            label="Seu E-mail"
            type="email"
            placeholder="example@email.com"
          />
          <Input
            icon={MdLock}
            name="password"
            label="Sua Senha"
            type="password"
            placeholder="************"
          />

          <SendButton type="submit" disabled={loading ? 'disabled' : undefined}>
            {loading ? (
              <Spinner size={24} spinnerColor={colors.white} spinnerWidth={3} />
            ) : (
              'Enviar no sistema'
            )}
          </SendButton>
        </Form>
      </Content>
    </Container>
  );
}
