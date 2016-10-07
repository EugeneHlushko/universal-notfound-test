import debug from 'debug';

import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import createFlux from 'flux/createFlux';

import ServerHTML from './server-html';
import universalRender from '../shared/universal-render';

export default async function (ctx) {
  // Init alt instance
  const flux = createFlux();

  // Get request locale for rendering
  const locale = ctx.cookies.get('_lang') ||
    ctx.acceptsLanguages(require('./config').locales) ||
    'en';

  const {messages} = require(`data/${locale}`);

  // Populate store with locale
  flux
    .getActions('locale')
    .switchLocale({locale, messages});

  debug('dev')(`locale of request: ${locale}`);

  try {
    const {body, title, statusCode, description} =
      await universalRender({flux, location: ctx.request.url});

    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json');

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')];
    }

    debug('dev')('return html content')
    const props = {body, assets, locale, title, description};
    const html = renderToStaticMarkup(<ServerHTML { ...props } />);
    ctx.status = statusCode;
    ctx.body = `<!DOCTYPE html>${html}`;
  } catch (err) {
    // Render 500 error page from server
    const {error, redirect} = err;
    if (error) throw error;

    // Handle component `onEnter` transition
    if (redirect) {
      const {pathname, search} = redirect;
      ctx.redirect(pathname + search);
    } else {
      throw err;
    }
  }
}
