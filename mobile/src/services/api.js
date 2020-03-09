import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: `http://${Platform.OS === 'ios' ? 'localhost' : '192.168.15.11'}:3333`, // como segundo parâmetro passe seu endereço de ip
});

export default api;
