import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
//npm i redux-persist
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];
//remove loggers from build
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);
//session
export default store;