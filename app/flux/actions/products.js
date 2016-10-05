import products from 'data/products';

class ProductsActions {

  constructor() {
    this.generateActions(
      'showSuccess', 'showFail'
    );
  }

  index() {
    return products;
  }

  show(seed: string) {
    const product = products.find(p => p.seed === seed);
    if (product) {
      this.showSuccess(products.find(p => p.seed === seed));
    } else {
      this.showFail({ msg: 'Product not found', code: '404' });
    }
  }
}

export default ProductsActions;
