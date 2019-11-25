import React, { Component } from 'react';
import styles from './ProductListItem.module.css';
import { Link } from 'react-router-dom';

class ProductListItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className={styles.product}>
        <div className={styles.image}>
          <Link to={`/product/${product.id}`}>
            <img src={product.photoURL} alt={product.description} />
          </Link>
        </div>
        <div className={styles.content}>
          <h3>
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <p>Rs {product.price}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
