import React from 'react';

import { compose } from 'rambda';
import { Routing } from 'pages';
import { Header } from './header';

import {
  withRouter, withTheme, withAlerts, withReactQuery,
} from './providers';

const wrappers = compose(withRouter, withAlerts, withTheme, withReactQuery);

function AppComponent() {
  return (
    <>
      <Header />
      <Routing />

    </>
  );
}
const App = wrappers(AppComponent);
export { App };
