import React, { Component, PropTypes } from 'react';

class Homepage extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { flux, i18n } = this.context;

    flux.getActions('helmet').update({ title: i18n('homepage.page-title') });
  }

  render() {
    const { i18n } = this.context;

    return (
      <div>
        <h1 className='text-center'>
          { i18n('homepage.title') }
        </h1>
      </div>
    );
  }

}

export default Homepage;
