import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import Immutable from 'seamless-immutable'
import reducers from '../../../reducers/index'
import rootSaga from '../../../sagas/index'

export default (initialState) => {
  for(let reducerName in initialState) {
    initialState[reducerName] = Immutable(initialState[reducerName])
  }

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  
  const store = createStore(reducers, initialState, enhancer);

  sagaMiddleware.run(rootSaga)

  return store;
}