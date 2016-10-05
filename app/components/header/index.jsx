import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/spinner';
import LangPicker from 'components/lang-picker';

const reactLogo = process.env.BROWSER
  ? require('images/react-logo.png')
  : imageResolver('images/react-logo.png');


@connect(({ requests: { inProgress } }) => ({ inProgress }))
class Header extends Component {

  static propTypes = {
    inProgress: PropTypes.bool
  };

  static contextTypes = {
    locales: PropTypes.array.isRequired,
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  };

  handleLocaleChange = (locale: string) => {
    const { flux } = this.context;
    flux.getActions('locale').switchLocale({ locale });
  };

  render() {
    const { inProgress } = this.props;
    const { locales: [ activeLocale ], i18n } = this.context;

    return (
      <header className='app--header'>
        {/* Spinner in the top right corner */}
        <Spinner active={ inProgress } />

        {/* LangPicker on the right side */}
        <LangPicker
          activeLocale={ activeLocale }
          onChange={ this.handleLocaleChange } />

        {/* React Logo in header */}
        <Link to='/' className='app--logo'>
          <img src={ reactLogo } alt='react-logo' />
        </Link>

        {/* Links in the navbar */}
        <ul className='app--navbar text-center reset-list un-select'>
          <li>
            <Link to={ i18n('routes.homepage') }>
              { i18n('header.menu.homepage') }
            </Link>
          </li>
          <li>
            <Link to={ i18n('routes.catalogue') }>
              { i18n('header.menu.catalogue') }
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
