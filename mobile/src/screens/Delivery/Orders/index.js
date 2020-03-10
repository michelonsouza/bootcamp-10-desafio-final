import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';
import { Header, OrderItem } from '~/components';

import ListHeader from './ListHeader';
import {
  Container,
  Content,
  OrderList,
  LoadingContainer,
  NoOrdersContainer,
  NoOrdersText,
} from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [deliveredFilter, setDeliveredFilter] = useState('pending');
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const { deliveryman } = useSelector(state => state.deliveryman);
  const theme = useContext(ThemeContext);

  async function loadOrders(delivered = false, page = 1) {
    setLoading(true);

    try {
      const { data: response } = await api.get(
        `/deliveryman/${deliveryman.id}/deliveries`,
        {
          params: {
            page,
            delivered,
          },
        }
      );

      setOrders(response.data.sort(a => (a.status === 'pending' ? 1 : -1)));
      setPagination(response.pagination);
    } catch (error) {
      Alert.alert('Erro', 'Erro 500: Problema internal com o servidor');
    }

    setLoading(false);
  }

  async function handleLoadMore() {
    try {
      // currentPage * orders.length < pagination.total
      if (orders.length < pagination.total) {
        setLoadingMore(true);

        const { data: response } = await api.get(
          `/deliveryman/${deliveryman.id}/deliveries`,
          {
            params: {
              page: currentPage + 1,
              delivered: false
            },
          }
        );

        setCurrentPage(currentPage + 1);
        setPagination(response.pagination);
        setOrders([...orders, ...response.data]);
        console.tron.log(orders.length);
      }
    } catch (error) {
      Alert.alert('Error', 'Erro 500: Problema internal com o servidor');
    }

    setLoadingMore(false);
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
      const [errorMessage] = error.response.data.error.errors;
      Alert.alert(
        'Erro',
        `Erro ao retirar a encomenda #${id}: \n ${errorMessage}`
      );
    }

    setLoading(false);
  }

  return (
    <Container>
      <Content>
        <Header />
        <ListHeader active={deliveredFilter} handlefilter={handlefilter} />
        {!loading && orders.length > 0 && (
          <OrderList
            data={orders}
            keyExtractor={item => String(item.id)}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            initialNumToRender={10}
            ListFooterComponent={() => loadingMore && <ActivityIndicator size="large" color={theme.colors.primary} />}
            renderItem={({ item }) => (
              <OrderItem
                delivery={item}
                handleStartDelivery={handleStartDelivery}
              />
            )}
          />
        )}

        {loading && (
          <LoadingContainer>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </LoadingContainer>
        )}

        {!orders.length > 0 && !loading && (
          <NoOrdersContainer>
            <NoOrdersText>Sem Encomendas para listar no momento.</NoOrdersText>
          </NoOrdersContainer>
        )}
      </Content>
    </Container>
  );
}
