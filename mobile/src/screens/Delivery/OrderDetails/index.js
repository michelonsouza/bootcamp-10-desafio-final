import React, { useMemo, useContext } from 'react';
// import {} from 'react-native';
import { ThemeContext } from 'styled-components';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card, DataDescribe, CardTitle } from '~/components';
import OrdersLayout from '~/screens/_layouts/ordersLayout';

import { ActionsContainer, Action, ActionText } from './styles';

export default function OrderDetails() {
  const theme = useContext(ThemeContext);
  const route = useRoute();
  const { delivery } = route.params;

  const address = useMemo(() => {
    const { street, number, city, state, zipcode } = delivery.recipient;

    return `${street}, ${number}, ${city} - ${state}, ${zipcode}`;
  }, [delivery.recipient]);

  const status = useMemo(() => {
    switch (delivery.status) {
      case 'pending':
        return 'Pendente';
      case 'withdrawal':
        return 'Retirada';
      case 'delivered':
        return 'Entregue';
      default:
        return 'Pendente';
    }
  }, [delivery.status]);

  return (
    <OrdersLayout>
      <Card>
        <CardTitle icon="local-shipping" title="Informações da entrega" />
        <DataDescribe title="Destinatário" data={delivery.recipient.name} />
        <DataDescribe title="Endereço de Entrega" data={address} />
        <DataDescribe title="Produto" data={delivery.product} last />
      </Card>

      <Card>
        <CardTitle icon="event" title="Situação da entrega" />
        <DataDescribe title="Status" data={status} />
        <DataDescribe title="Endereço de Entrega" data={address} />
        <DataDescribe title="Produto" data={delivery.product} last />
      </Card>

      <ActionsContainer>
        <Action>
          <Icon name="highlight-off" size={26} color={theme.colors.danger} />
          <ActionText>Informar{'\n'}Problema</ActionText>
        </Action>
        <Action center>
          <Icon name="info-outline" size={26} color={theme.colors.warning} />
          <ActionText>Visualizar{'\n'}Problemas</ActionText>
        </Action>
        <Action>
          <Icon name="alarm-on" size={26} color={theme.colors.primary} />
          <ActionText>Confirmar{'\n'}Entrega</ActionText>
        </Action>
      </ActionsContainer>
    </OrdersLayout>
  );
}
