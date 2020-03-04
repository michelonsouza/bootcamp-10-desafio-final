import styled from 'styled-components/native';

export const Container = styled.View`
  height: 68px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliverymanContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const AvatarInitials = styled.View`
  height: 68px;
  width: 68px;
  border-radius: 34px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: ${props => props.theme.colors.avatarBackground};
`;

export const InfoContainer = styled.View`
  flex: 1;
  height: 68px;
  justify-content: center;
`;

export const AvatarInitialsText = styled.Text`
  color: ${props => props.theme.colors.secondary};
  font-size: 31px;
`;

export const WelcomeText = styled.Text`
  color: ${props => props.theme.colors.textColorLight};
  font-size: 12px;
`;

export const Name = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 22px;
  font-weight: bold;
`;
