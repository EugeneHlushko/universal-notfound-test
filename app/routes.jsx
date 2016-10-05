import React from 'react';
import { Route } from 'react-router';

import { generateRoute } from 'utils/localized-routes';

export default function () { /* eslint react/display-name: 0 */
  return (
    <Route component={ require('./containers/app') }>
      { generateRoute({
        paths: [ '/', '/ru' ],
        component: require('./containers/homepage')
      }) }
      { generateRoute({
        paths: [ '/catalogue', '/katalog' ],
        component: require('./containers/catalogue')
      }) }
      { generateRoute({
        paths: [ '/product/:seed', '/tovar/:seed' ],
        component: require('./containers/product')
      }) }
      <Route path='*' component={ require('./pages/not-found') } />
    </Route>
  );
}
