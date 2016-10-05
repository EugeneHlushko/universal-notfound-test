/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import cx from 'classnames';

type Props = {
  activeLocale: string,
  onChange: Function<string>
};

const locales = [ 'en', 'ru' ];

function LangPicker(props: Props) {
  const { activeLocale, onChange } = props;

  return (
    <ul className='lang--picker un-select'>
      { locales.map((locale, index) =>
        <li key={ index }>
          <a
            className={ cx({ active: locale === activeLocale }) }
            onClick={ () => onChange(locale) }>
            { locale }
          </a>
        </li>) }
    </ul>
  );
}

export default LangPicker;
