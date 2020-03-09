import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
