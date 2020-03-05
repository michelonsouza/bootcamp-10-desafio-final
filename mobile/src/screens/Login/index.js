import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import logo_light from '~/assets/images/logo_light.png';

import { loginRequest } from '~/store/modules/auth/actions';
import { Button } from '~/components';
import { Container, Form, Input, Logo } from './styles';

export default function Login() {
  const [deliverymanId, setDeliverymanId] = useState(null);
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const inputRef = useRef();

  function handleSubmit() {
    dispatch(loginRequest(deliverymanId));
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Form>
        <Logo source={logo_light} />
        <Input
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          value={deliverymanId}
          onChangeText={setDeliverymanId}
          onSubmitEditing={handleSubmit}
          placeholder="Informe seu ID de cadastro"
          ref={inputRef}
        />
        <Button onPress={handleSubmit} variant="success" loading={loading}>
          Entrar no sistema
        </Button>
      </Form>
    </Container>
  );
}
