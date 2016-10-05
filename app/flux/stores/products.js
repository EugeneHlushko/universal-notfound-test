import debug from 'debug';

class ProductsStore {

  constructor() {
    this.bindActions(this.alt.getActions('products'));

    this.collection = [];
    this.product = false;
    this.error = null;
  }

  onIndex(products) {
    debug('dev')('In onIndexSuccess, here are the products received');
    debug('dev')(products);

    this.collection = products;
    if (this.error) this.error = null;
  }

  onIndexFail(error: Object) {
    this.error = error;
  }

  onShowSuccess(product: Object) {
    debug('dev')('In store, setting the product!');
    debug('dev')(product);
    this.product = product;
    if (this.error) this.error = null;
  }

  onShowFail(error: Object) {
    this.error = error;
  }
}

export default ProductsStore;
