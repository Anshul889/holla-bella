import React, { Component} from 'react';
import ProductListItem from './ProductListItem';
import styles from './ProductList.module.css';

class ProductList extends Component {
  render() {
    const { products, getNextProducts, loading, moreProducts } = this.props;
    return (
      <div className={styles.container}>
        {products && products.length !== 0 && (
          <div
          pageStart={0}
            loadMore={getNextProducts}
            hasMore={!loading && moreProducts}
            initialLoad={false}
            >
            {products &&
              products.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default ProductList;
