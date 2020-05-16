import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { persistConfig } from './persistConfig';
import { rootReducer } from './rootReducer';
import { loggerMiddleware } from './middleware';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = createStore(
    persistedReducer,
    applyMiddleware(
        sagaMiddleware,
        loggerMiddleware,
        batchDispatchMiddleware,
    )
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(appStore);
