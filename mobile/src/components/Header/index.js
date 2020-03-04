import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DeliverymanContainer,
  AvatarInitials,
  AvatarInitialsText,
  InfoContainer,
  WelcomeText,
  Name,
} from './styles';

export default function Header() {
  const theme = useContext(ThemeContext);
  console.tron.log(theme);

  return (
    <Container>
      <DeliverymanContainer>
        <AvatarInitials>
          <AvatarInitialsText>MS</AvatarInitialsText>
        </AvatarInitials>
        <InfoContainer>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <Name>Michelon Souza</Name>
        </InfoContainer>
      </DeliverymanContainer>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="exit-to-app" size={24} color={theme.colors.danger} />
      </TouchableOpacity>
    </Container>
  );
}
