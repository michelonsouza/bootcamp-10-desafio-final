import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import persistReducers from './persistReducers';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlwares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlwares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
