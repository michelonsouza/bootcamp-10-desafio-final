import styled, { css } from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.base}px 0;
`;

export const Head = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.base}px;
  margin-bottom: ${props => props.theme.spacing.base / 2}px;
  padding: 0 ${props => props.theme.spacing.base}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 22px;
  font-weight: bold;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FilterButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: ${props => props.theme.spacing.base - 5}px;
  ${props =>
    props.active &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.colors.primary};
    `}
`;

export const FilterText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props =>
    props.theme.colors[props.active ? 'primary' : 'secondaryTextColor']};
`;

export const OrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 10px ${props => props.theme.spacing.base}px 10px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  border-radius: ${props => props.theme.metrics.borderRadius};
  margin: ${props => props.theme.spacing.base / 2}px
    ${props => props.theme.spacing.base}px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.theme.colors.borderColor};
`;

export const NoOrdersContainer = styled.View`
  border-radius: ${props => props.theme.metrics.borderRadius};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoOrdersText = styled.Text`
  color: ${props => props.theme.colors.secondaryTextColor};
  margin-bottom: ${props => props.theme.spacing.base / 2}px;
  font-size: 26px;
  text-align: center;
`;
