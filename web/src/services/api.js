import axios from 'axios';
import history from './history';

import { store } from '~/store';
import { logOut } from '~/store/modules/auth/actions';


const api = axios.create({
  baseURL: 'http://localhost:3333'
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // eslint-disable-next-line no-console
    console.log('status:error', [error]);

    if (
      error.response.status > 400 &&
      error.response.status < 404 &&
      window.location.pathname !== '/'
    ) {
      store.dispatch(logOut());
      history.push('/');
    }

    return Promise.reject(error);
  }
);

export default api;
