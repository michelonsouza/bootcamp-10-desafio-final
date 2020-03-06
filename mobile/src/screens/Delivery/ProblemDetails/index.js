import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import OrdersLayout from '~/screens/_layouts/ordersLayout';
import { Card } from '~/components';

import {
  ProblemList,
  ProblemContainer,
  ProblemDescription,
  DateText,
  NoProblemContainer,
  NoProblemText,
  LoadingContainer,
} from './styles';

export default function ProblemDetails() {
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const theme = useContext(ThemeContext);
  const { delivery } = route.params;

  function dateFormat(date) {
    return format(parseISO(date), 'dd/MM/yyyy');
  }

  useEffect(() => {
    async function loadProblems() {
      setLoading(true);

      try {
        const { data: response } = await api.get(
          `/delivery/${delivery.id}/problems`
        );

        setDeliveryProblems(response.data);
      } catch (error) {
        Alert.alert(
          'Error',
          `Problemas ao recuperar os erros da encomenda #${delivery.id}`
        );
      }

      setLoading(false);
    }

    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrdersLayout title={`Encomenda ${delivery.id}`}>
      <>
        {!loading && deliveryProblems.length > 0 && (
          <ProblemList
            data={deliveryProblems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Card>
                <ProblemContainer>
                  <ProblemDescription>{item.description}</ProblemDescription>
                  <DateText>{dateFormat(item.created_at)}</DateText>
                </ProblemContainer>
              </Card>
            )}
          />
        )}

        {!loading && !deliveryProblems.length && (
          <NoProblemContainer>
            <NoProblemText>
              Esta encomenda não possui nenhum problema.
            </NoProblemText>
            <Icon name="mood" size={100} color={theme.colors.primary} />
          </NoProblemContainer>
        )}
        {loading && (
          <LoadingContainer>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </LoadingContainer>
        )}
      </>
    </OrdersLayout>
  );
}
