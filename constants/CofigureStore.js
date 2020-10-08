import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { AsyncStorage } from 'react-native';
import rootSaga from './sagas';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga)
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};

export { getStore, getState, getPersistor };
export default { getStore, getState, getPersistor };