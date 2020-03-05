import React, { useContext, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import {
  Container,
  Title,
  TitleContainer,
  StatusContainer,
  Bullet,
  BackLine,
  StatusDesc,
  StateContainer,
  Footer,
  DataContainer,
  DataDesc,
  DataText,
} from './styles';

export default function OrderItem({ delivery }) {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const formattedDate = useMemo(() => {
    return format(parseISO(delivery.created_at), 'dd/MM/yyyy');
  }, [delivery]);

  const active = useMemo(() => {
    switch (delivery.status) {
      case 'withdrawal':
        return 2;
      case 'delivered':
        return 3;
      case 'canceled':
        return -1;
      default:
        return 1;
    }
  }, [delivery.status]);

  function handleDetails() {
    navigation.navigate('OrderDetails', { delivery });
  }

  return (
    <Container>
      <TitleContainer>
        <Icon name="local-shipping" size={22} color={theme.colors.primary} />
        <Title>Encomenda {delivery.id}</Title>
      </TitleContainer>
      <StatusContainer>
        <BackLine />
        <StateContainer>
          <Bullet active />
          <StatusDesc>Aguardando{'\n'}Retirada</StatusDesc>
        </StateContainer>
        <StateContainer>
          <Bullet active={active >= 2} />
          <StatusDesc>Retirada</StatusDesc>
        </StateContainer>
        <StateContainer>
          <Bullet active={active >= 3} />
          <StatusDesc>Entregue</StatusDesc>
        </StateContainer>
      </StatusContainer>
      <Footer>
        <DataContainer>
          <DataDesc>Data</DataDesc>
          <DataText>{formattedDate}</DataText>
        </DataContainer>
        <DataContainer>
          <DataDesc>Cidade</DataDesc>
          <DataText>{delivery.recipient.city}</DataText>
        </DataContainer>
        <TouchableOpacity onPress={() => handleDetails()}>
          <DataText link>Ver detalhes</DataText>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
}

OrderItem.propTypes = {
  delivery: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    created_at: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
};
