import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from './reducers'
import mySaga from './sagas/Notes'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// Mount it on the Store
const store = createStore(
  reducer,
  // applyMiddleware(sagaMiddleware),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

// Then run the saga
sagaMiddleware.run(mySaga)

// Render the application
export default store;

// Types
export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state