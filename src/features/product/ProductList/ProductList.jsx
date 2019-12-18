import React, { Component } from "react";
import ProductListItem from "./ProductListItem";
import styles from "./ProductList.module.css";
import { Link } from "react-router-dom";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <div className={styles.filter}>
          <div
            style={{
              color: "#c29957",
              fontWeight: "700",
              paddingBottom: "10px",
              gridColumn: "span 3",
              justifySelf: "center",
              textTransform: "uppercase"
            }}
          >
            Categories
          </div>
          <div>
            <Link to='/jewellery'>Jewellery</Link>
          </div>
          <div>
            <Link to='/beauty'>Beauty</Link>
          </div>
          <div>
            <Link to='/bags'>Bags</Link>
          </div>
        </div>

        <div className={styles.container}>
          {products &&
            products.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
