import React, { Component} from 'react';
import ProductListItem from './ProductListItem';
import styles from './ProductList.module.css';

class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className={styles.container}>
            {products &&
              products.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
          </div>
        )}
  }

export default ProductList;
