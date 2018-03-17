import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App.jsx';
import SignIn from './components/auth/SignIn.jsx';
import SignOut from './components/auth/SignOut.jsx';
import reducers from './redux';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="signin" component={SignIn} />
        <Route path="signout" component={SignOut} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
