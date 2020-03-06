import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import { Button } from '~/components';
import OrdersLayout from '~/screens/_layouts/ordersLayout';

import { InputText } from './styles';

export default function ProblemDetails() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { delivery } = route.params;

  async function hanldeSubmit() {
    setLoading(true);

    try {
      await api.post(`/delivery/${delivery.id}/problems`, { description });

      navigation.navigate('Orders');
    } catch (error) {
      Alert.alert(
        'Erro',
        `Erro ao cadastrar problema para a encomenda #${delivery.id}`
      );
    }

    setLoading(false);
  }

  return (
    <OrdersLayout>
      <InputText
        placeholder="Inclua o problema que ocorreu na entrega."
        onSubmitEditing={hanldeSubmit}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="send"
        value={description}
        onChangeText={setDescription}
        editable={!loading}
        multiline
      />

      <Button variant="primary" onPress={hanldeSubmit} loading={loading}>
        Enviar
      </Button>
    </OrdersLayout>
  );
}
