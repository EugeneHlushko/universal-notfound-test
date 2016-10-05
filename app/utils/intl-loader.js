/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
const loaders = {
  en: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')();
      await require('promise?global!intl/locale-data/jsonp/en')();
    }
    return await require('promise?global!data/en')();
  },

  ru: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')();
      await require('promise?global!intl/locale-data/jsonp/ru')();
    }
    return await require('promise?global!data/ru')();
  }
};

export default async (locale) => {
  if (process.env.NODE_ENV === 'test') return { messages: {} };

  const result = await loaders[locale]();
  if (process.env.BROWSER) {
    window.ReactIntl = require('react-intl');
    const { addLocaleData } = require('react-intl');
    addLocaleData(require(`react-intl/locale-data/${locale}`));
  }

  return result;
};
