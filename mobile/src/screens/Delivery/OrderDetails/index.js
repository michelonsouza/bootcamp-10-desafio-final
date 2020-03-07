import React, { useMemo, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import { Card, DataDescribe, CardTitle } from '~/components';
import OrdersLayout from '~/screens/_layouts/ordersLayout';

import { ActionsContainer, Action, ActionText, DateContainer } from './styles';

export default function OrderDetails() {
  const theme = useContext(ThemeContext);
  const route = useRoute();
  const navigation = useNavigation();
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

  const actionActive = useMemo(() => {
    return delivery.status !== 'canceled' && delivery.status !== 'delivered';
  }, [delivery.status]);

  const endDateFormatted = useMemo(() => {
    return delivery.end_date
      ? format(parseISO(delivery.end_date), 'dd / MM / yyyy')
      : '-- / -- / --';
  }, [delivery.end_date]);

  const startDateFormatted = useMemo(() => {
    return delivery.start_date
      ? format(parseISO(delivery.start_date), 'dd / MM / yyyy')
      : '-- / -- / --';
  }, [delivery.start_date]);

  return (
    <OrdersLayout>
      <>
        <Card>
          <CardTitle icon="local-shipping" title="Informações da entrega" />
          <DataDescribe title="Destinatário" data={delivery.recipient.name} />
          <DataDescribe title="Endereço de Entrega" data={address} />
          <DataDescribe title="Produto" data={delivery.product} last />
        </Card>

        <Card>
          <CardTitle icon="event" title="Situação da entrega" />
          <DataDescribe title="Status" data={status} />
          <DateContainer>
            <DataDescribe title="data de Retirada" data={startDateFormatted} />
            <DataDescribe title="Data de Entrega" data={endDateFormatted} />
          </DateContainer>
        </Card>

        <ActionsContainer>
          {actionActive && (
            <Action
              next
              onPress={() => navigation.navigate('ProblemSend', { delivery })}>
              <Icon
                name="highlight-off"
                size={26}
                color={theme.colors.danger}
              />
              <ActionText>Informar{'\n'}Problema</ActionText>
            </Action>
          )}
          <Action
            next
            onPress={() => navigation.navigate('ProblemDetails', { delivery })}>
            <Icon name="info-outline" size={26} color={theme.colors.warning} />
            <ActionText>Visualizar{'\n'}Problemas</ActionText>
          </Action>
          {actionActive && (
            <Action>
              <Icon name="alarm-on" size={26} color={theme.colors.primary} />
              <ActionText>Confirmar{'\n'}Entrega</ActionText>
            </Action>
          )}
        </ActionsContainer>
      </>
    </OrdersLayout>
  );
}
