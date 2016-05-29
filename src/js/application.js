import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import Root from './containers/root';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const target = document.getElementById('main_container');
const node = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Root routerHistory={history} store={store} />
  </MuiThemeProvider>
);

injectTapEventPlugin();

ReactDOM.render(node, target);
