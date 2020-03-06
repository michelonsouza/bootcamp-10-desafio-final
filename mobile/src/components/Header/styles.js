import styled from 'styled-components/native';

export const Container = styled.View`
  height: 68px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.base}px;
`;

export const DeliverymanContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const Avatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 34px;
  background: ${props => props.theme.colors.avatarBackground};
  margin-right: 12px;
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
