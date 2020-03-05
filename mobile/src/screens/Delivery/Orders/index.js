import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';

import api from '~/services/api';
import { Header, OrderItem } from '~/components';

import ListHeader from './ListHeader';
import { Container, Content, OrderList, LoadingContainer } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { deliveryman } = useSelector(state => state.deliveryman);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      const { data: response } = await api.get(
        `/deliveryman/${deliveryman.id}/deliveries`
      );

      setOrders(response.data);
      setLoading(false);
    }

    loadOrders();
  }, [deliveryman.id]);

  return (
    <Container>
      <Content>
        <Header />
        <ListHeader />
        {!loading ? (
          <OrderList
            data={orders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <OrderItem delivery={item} />}
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
