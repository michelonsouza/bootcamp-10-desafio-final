import axios from 'axios';

const viacep = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export default viacep;
