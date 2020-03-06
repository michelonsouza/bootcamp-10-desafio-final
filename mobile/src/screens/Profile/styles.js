import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.base}px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
`;

export const Avatar = styled.Image`
  background: ${props => props.theme.colors.avatarBackground};
  margin-bottom: ${props => props.theme.spacing.base * 2.5}px;
  height: 184px;
  width: 184px;
  border-radius: 92px;
  margin-right: 12px;
`;

export const AvatarInitials = styled.View`
  background: ${props => props.theme.colors.avatarBackground};
  margin-bottom: ${props => props.theme.spacing.base * 2.5}px;
  height: 184px;
  width: 184px;
  border-radius: 92px;
  align-items: center;
  justify-content: center;
`;

export const AvatarInitialsText = styled.Text`
  color: ${props => props.theme.colors.secondary};
  font-size: 84px;
`;

export const InfoContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.base}px;
`;

export const InfoDesc = styled.Text`
  color: ${props => props.theme.colors.textColorLight};
  margin-bottom: ${props => props.theme.spacing.base / 4}px;
  font-size: 16px;
`;

export const InfoData = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${props => props.theme.colors.textColor};
  font-size: 26px;
  font-weight: bold;
`;
