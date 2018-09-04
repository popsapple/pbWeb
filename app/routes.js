/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ThemePage from './containers/ThemePage';
import IntroPage from './containers/IntroPage';

export default () => (
  <App>
    <div>
      {/* <Route exact path="/" component={IntroPage}/> */}
      <Route path="/" component={HomePage} />
      <Route exact path="/ThemePage" component={ThemePage} />
      {/* <Route path="/Error" component={ErrorPage} /> */}
    </div>
  </App>
);
