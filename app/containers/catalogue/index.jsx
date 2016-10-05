import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';

import { replaceParams } from 'utils/localized-routes';

@connect(({ products: { collection } }) => ({ collection }))
class Catalogue extends Component {

  static propTypes = { collection: PropTypes.array.isRequired };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { flux, i18n } = this.context;

    flux.getActions('helmet').update({ title: i18n('catalogue.page-title') });
    flux.getActions('products').index();
  }

  renderProduct = (
    product: ?Object,
    index: number
  ) => {
    const { i18n } = this.context;
    const { seed, name } = product;
    const productUrl: string = replaceParams(i18n('routes.product'), { seed });

    return (
      <tr className='user--row' key={ index }>
        <td>{ name }</td>
        <td className='text-center'>
          <Link to={ productUrl }>{ i18n('catalogue.product.view') }</Link>
        </td>
      </tr>
    );
  };

  render() {
    const { collection } = this.props;
    const { i18n } = this.context;

    return (
      <div>
        <h1 className='text-center'>
          { i18n('catalogue.title') }
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>{ i18n('catalogue.product.name') }</th>
            </tr>
          </thead>
          <tbody>
            { collection.map(this.renderProduct) }
          </tbody>
        </table>
      </div>
    );
  }

}

export default Catalogue;
