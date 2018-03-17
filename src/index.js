import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/App.jsx';
import SignIn from './components/auth/SignIn.jsx';
import reducers from './redux';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <App>
        <Route path="/signin" component={SignIn} />
      </App>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
