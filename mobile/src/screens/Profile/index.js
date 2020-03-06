import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { nameInitials } from '~/utils/format';
import { logout } from '~/store/modules/auth/actions';
import { Button } from '~/components';

import {
  Container,
  Content,
  Avatar,
  AvatarInitials,
  AvatarInitialsText,
  InfoContainer,
  InfoDesc,
  InfoData,
} from './styles';

export default function Profile() {
  const { deliveryman } = useSelector(state => state.deliveryman);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const initials = useMemo(() => {
    return nameInitials(deliveryman.name);
  }, [deliveryman.name]);

  const registerDate = useMemo(() => {
    return format(parseISO(deliveryman.createdAt), 'dd/MM/yyyy');
  }, [deliveryman.createdAt]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      {deliveryman.avatar ? (
        <Avatar source={{ uri: deliveryman.avatar.url }} />
      ) : (
        <AvatarInitials>
          <AvatarInitialsText>{initials}</AvatarInitialsText>
        </AvatarInitials>
      )}

      <Content>
        <InfoContainer>
          <InfoDesc>Nome completo</InfoDesc>
          <InfoData>{deliveryman.name}</InfoData>
        </InfoContainer>
        <InfoContainer>
          <InfoDesc>E-mail</InfoDesc>
          <InfoData>{deliveryman.email}</InfoData>
        </InfoContainer>
        <InfoContainer>
          <InfoDesc>Data de cadastro</InfoDesc>
          <InfoData>{registerDate}</InfoData>
        </InfoContainer>
        <Button onPress={handleLogout} variant="danger">
          Logout
        </Button>
      </Content>
    </Container>
  );
}
