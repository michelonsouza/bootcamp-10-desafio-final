import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';
import { Header, OrderItem } from '~/components';

import ListHeader from './ListHeader';
import { Container, Content, OrderList, LoadingContainer } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [deliveredFilter, setDeliveredFilter] = useState('pending');
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const { deliveryman } = useSelector(state => state.deliveryman);
  const theme = useContext(ThemeContext);

  async function loadOrders(delivered = false) {
    setLoading(true);
    const { data: response } = await api.get(
      `/deliveryman/${deliveryman.id}/deliveries`,
      {
        params: {
          delivered,
        },
      }
    );

    setOrders(response.data.sort(a => (a.status === 'pending' ? -1 : 1)));
    setLoading(false);
  }

  useEffect(() => {
    setDeliveredFilter('pending');
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  function handlefilter(filter) {
    loadOrders(filter);
    setDeliveredFilter(filter ? 'delivered' : 'pending');
  }

  async function handleStartDelivery(id) {
    setLoading(true);

    try {
      const { data: response } = await api.post(
        `/deliveryman/${deliveryman.id}/deliveries/${id}`,
        {
          start_date: new Date(),
        }
      );

      setOrders(orders.map(order => (order.id === id ? response.data : order)));
      Alert.alert(
        'Sucesso',
        `Encomenda #${id} retirada com sucesso, inicia sua entrega`
      );
    } catch (error) {
      Alert.alert('Erro', `Erro ao retirar a encomenda #${id}`);
    }

    setLoading(false);
  }

  return (
    <Container>
      <Content>
        <Header />
        <ListHeader active={deliveredFilter} handlefilter={handlefilter} />
        {!loading ? (
          <OrderList
            data={orders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <OrderItem
                delivery={item}
                handleStartDelivery={handleStartDelivery}
              />
            )}
          />
        ) : (
          <LoadingContainer>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </LoadingContainer>
        )}
      </Content>
    </Container>
  );
}
