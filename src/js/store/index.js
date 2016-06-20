import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware }             from 'react-router-redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import reducers                         from '../reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)

  let appliedMiddleware;
  if (process.env.NODE_ENV === 'production') {
    appliedMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware);
  } else {
    appliedMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware);
  }
  const createStoreWithMiddleware = appliedMiddleware(createStore);

  return createStoreWithMiddleware(reducers);
}
