import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import debug from 'debug';

@connect(({ products: { product } }) => ({ product }))
class Profile extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  };

  static propTypes = {
    params: PropTypes.object.isRequired,
    product: PropTypes.object
  };

  componentWillMount() {
    const { flux } = this.context;
    const { params: { seed } } = this.props;

    this.updatePageTitle();
    flux.getActions('products').show(seed);
    debug('dev')('Mlounting the products container');
    debug('dev')(this.props);
  }

  updatePageTitle() {
    const { flux, i18n } = this.context;
    const { product } = this.props;

    let title;
    if (product) {
      const { name } = product;

      title = i18n('product.page-title', { name });
    } else {
      title = i18n('product.notfound.page-title');
    }

    flux.getActions('helmet').update({ title });
  }

  render() {
    const { product } = this.props;
    const { i18n } = this.context;

    if (product) {
      const {
        name,
        price: {
          basePrice,
          oldPrice,
          priceUnit
        },
        description
      } = product;

      return (
        <div className='app--profile text-center'>
          <h2>{ name }</h2>
          <p>{ description }</p>
          <p>Price: { basePrice } / { oldPrice } {priceUnit}</p>
        </div>
      );
    }

    return (<h2>{ i18n('product.notfound.title') }</h2>);
  }

}

export default Profile;
