import React, { Component } from "react";
import { connect } from "react-redux";
import { getBags } from "./BagsActions";
import styles from "./Bags.module.css";
import { Link } from "react-router-dom";
import { Placeholder, Button } from "semantic-ui-react";
import bagsimg from "../../../assets/Bags.png";

const mapState = state => ({
  bags: state.bags
});

const actions = {
  getBags
};

class Bags extends Component {
  state = {
    products: [],
    sortedByPrice: "",
    sortedByName: ""
  };

  filterAsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b) {
      var x = a.price;
      var y = b.price;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    this.setState({ products: filteredProducts, sortedByPrice: "priceLow" });
  };

  filterDsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b) {
      var x = a.price;
      var y = b.price;
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    this.setState({ products: filteredProducts, sortedByPrice: "priceHigh" });
  };

  filterNameAsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    this.setState({ products: filteredProducts, sortedByName: "ZtoA" });
  };

  filterNameDsc = () => {
    let filteredProducts = this.state.products.sort(function(a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
    this.setState({ products: filteredProducts, sortedByName: "AtoZ" });
  };

  async componentDidMount() {
    await this.props.getBags();
    this.setState({ products: this.props.bags });
  }

  render() {
    const { products, sortedByPrice, sortedByName } = this.state;
    if (products.length === 0) {
      return (
        <div className={styles.bags}>
          <img
            className={styles.banner}
            style={{ width: "100%" }}
            src={bagsimg}
            alt="bags"
          />
          <h1 className={styles.heading}>Bags</h1>
          <div className={styles.container}>
            <div className={styles.inner}>
              <div className={styles.product}>
                <div className={styles.image}>
                  <Placeholder>
                    <Placeholder.Image />
                  </Placeholder>
                </div>
              </div>
              <div className={styles.product}>
                <div className={styles.image}>
                  <Placeholder>
                    <Placeholder.Image />
                  </Placeholder>
                </div>
              </div>
              <div className={styles.product}>
                <div className={styles.image}>
                  <Placeholder>
                    <Placeholder.Image />
                  </Placeholder>
                </div>
              </div>
              <div className={styles.product}>
                <div className={styles.image}>
                  <Placeholder>
                    <Placeholder.Image />
                  </Placeholder>
                </div>
              </div>
              <div className={styles.product}>
                <div className={styles.image}>
                  <Placeholder>
                    <Placeholder.Image />
                  </Placeholder>
                </div>
              </div>
              <div className={styles.product}>
                <div className={styles.image}>
                  <Placeholder>
                    <Placeholder.Image />
                  </Placeholder>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.bags}>
        <img className={styles.banner} src={bagsimg} alt="bags" />
        <h1 className={styles.heading}>Bags</h1>
        <div className={styles.container}>
          <div className={styles.filter}>
            <Button
              active={sortedByPrice === "lowestPrice"}
              onClick={this.filterAsc}
            >
              Lowest Price
            </Button>
            <Button
              active={sortedByPrice === "highestPrice"}
              onClick={this.filterDsc}
            >
              Highest Price
            </Button>
            {sortedByName === "ZtoA" && (
              <Button onClick={this.filterNameDsc}>Name</Button>
            )}
            {(sortedByName === "" || sortedByName === "AtoZ") && (
              <Button onClick={this.filterNameAsc}>Name</Button>
            )}
          </div>
          <div className={styles.inner}>
            {products &&
              products.map(product => (
                <div className={styles.product} key={product.id}>
                  <div className={styles.image}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.photoURL}
                        alt={product.title}
                        loading={"lazy"}
                      />
                    </Link>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.title}>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </div>
                    <div className={styles.price}>
                      {product.discount > 0 && (
                        <span
                          style={{
                            paddingRight: "5px",
                            fontWeight: "100",
                            color: "gray"
                          }}
                        >
                          <strike>{product.price} KSH</strike>
                        </span>
                      )}
                      <Link to={`/product/${product.id}`}>
                        {Math.round(
                          product.price -
                            (product.price * product.discount) / 100
                        )}{" "}
                        KSH
                      </Link>
                      <br />
                      {product.discount > 0 && (
                        <span
                          className={styles.blink}
                          style={{ color: "green" }}
                        >
                          {product.discount}% OFF{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Bags);
