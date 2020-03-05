import React, { useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { nameInitials } from '~/utils/format';
import { logout } from '~/store/modules/auth/actions';

import {
  Container,
  DeliverymanContainer,
  Avatar,
  AvatarInitials,
  AvatarInitialsText,
  InfoContainer,
  WelcomeText,
  Name,
} from './styles';

export default function Header() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { deliveryman } = useSelector(state => state.deliveryman);

  const initials = useMemo(() => {
    return nameInitials(deliveryman.name);
  }, [deliveryman]);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <DeliverymanContainer>
        {deliveryman.avatar ? (
          <Avatar source={{ uri: deliveryman.avatar.url }} />
        ) : (
          <AvatarInitials>
            <AvatarInitialsText>{initials}</AvatarInitialsText>
          </AvatarInitials>
        )}
        <InfoContainer>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <Name>{deliveryman.name}</Name>
        </InfoContainer>
      </DeliverymanContainer>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="exit-to-app" size={24} color={theme.colors.danger} />
      </TouchableOpacity>
    </Container>
  );
}
