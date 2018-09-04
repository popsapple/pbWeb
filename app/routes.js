/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ThemePage from './containers/ThemePage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/ThemePage" component={ThemePage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </App>
);
