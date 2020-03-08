import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import {
  useIsFocused,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';

import api from '~/services/api';
import OrdersLayout from '~/screens/_layouts/ordersLayout';
import Button from '~/components/Button';
import { Container, Camera } from './styles';

export default function OrderConfirm() {
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const { delivery } = route.params;
  const { deliveryman } = useSelector(state => state.deliveryman);

  async function handleSubmit() {
    if (camera) {
      setLoading(true);
      try {
        const options = { quality: 0.5 };
        const data = await camera.takePictureAsync(options);

        const formData = new FormData();
        formData.append('file', {
          uri: data.uri,
          name: 'siganture.jpg',
          type: 'image/jpg',
        });

        const { data: response } = await api.post('/files', formData);
        const { id } = response.data;

        await api.put(
          `/deliveryman/${deliveryman.id}/deliveries/${delivery.id}`,
          {
            signature_id: id,
            end_date: new Date(),
          }
        );

        Alert.alert(
          'Sucesso',
          `Encomenda #${delivery.id} atualizada com sucesso`
        );

        navigation.navigate('Orders');
      } catch (error) {
        Alert.alert('Erro', `Erro ao finalizar encomenda #${delivery.id}`);
      }

      setLoading(false);
    }
  }

  return (
    <OrdersLayout>
      <>
        <Container>
          {isFocused && (
            <Camera
              ref={ref => {
                setCamera(ref);
              }}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar a câmera',
                message: 'Precisamos de permissão para usar sua câmera',
                buttonPositive: 'OK',
                buttonNegative: 'Cancelar',
              }}
            />
          )}
        </Container>
        <Button variant="primary" onPress={handleSubmit} loading={loading}>
          Enviar
        </Button>
      </>
    </OrdersLayout>
  );
}
