import debug from 'debug';
// Paths are relative to `app` directory
import createFlux from 'flux/createFlux';

import universalRender from '../shared/universal-render';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') debug.enable('dev,koa');

const flux = createFlux();

universalRender({ flux }).catch(err => debug('dev')(err));
