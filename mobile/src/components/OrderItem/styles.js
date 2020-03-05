import styled, { css } from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

function caclBacklineWidth(props) {
  return width - props.theme.spacing.base - 130;
}

export const Container = styled.View`
  /* border: 2px solid ${props => props.theme.colors.borderColor}; */
  border-radius: ${props => props.theme.metrics.borderRadius};
  background: ${props => props.theme.colors.background};
  margin-bottom: ${props => props.theme.spacing.base * 1.5}px;

  ${
    Platform.OS === 'ios'
      ? css`
          box-shadow: 0 0 2px ${props => props.theme.colors.borderColor};
        `
      : css`
          border: 2px solid ${props => props.theme.colors.borderColor};
        `
  }
`;

export const Bullet = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 1.3px solid ${props => props.theme.colors.primary};
  background: ${props =>
    props.theme.colors[props.active ? 'primary' : 'background']};
`;

export const StatusContainer = styled.View`
  height: 70px;
  padding: ${props => props.theme.spacing.base / 2}px
    ${props => props.theme.spacing.base}px;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const BackLine = styled.View`
  height: 1.3px;
  width: ${props => caclBacklineWidth(props)}px;
  flex: 1;
  background: ${props => props.theme.colors.primary};
  position: absolute;
  top: 15px;
  left: ${props => props.theme.spacing.base + 30}px;
`;

export const StateContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 70px;
`;

export const StatusDesc = styled.Text`
  color: ${props => props.theme.colors.secondaryTextColor};
  font-size: 10px;
  text-align: center;
  margin-top: 5px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.theme.spacing.base / 2}px
    ${props => props.theme.spacing.base}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  margin-left: 10px;
`;

export const Footer = styled.View`
  padding: ${props => props.theme.spacing.base}px;
  background: ${props => props.theme.colors.secondaryBackground};
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DataContainer = styled.View`
  max-width: 90px;
`;

export const DataDesc = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: ${props => props.theme.colors.secondaryTextColor};
  margin-bottom: 5px;
`;

export const DataText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.colors[props.link ? 'primary' : 'textColor']};
`;
