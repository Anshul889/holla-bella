import React, { Component } from "react";
import { connect } from "react-redux";
import { getJewellery } from "./JewelleryActions";
import styles from "./Jewellery.module.css";
import { Link } from "react-router-dom";
import { Placeholder } from "semantic-ui-react";
import jewelleryimg from '../../../assets/Jewellery.jpg'

const mapState = state => ({
  jewellery: state.jewellery
});

const actions = {
  getJewellery
};

class Jewellery extends Component {
  state = {
    products: []
  };

  // function myFunction() {
  //   cars.sort(function(a, b){
  //     var x = a.type.toLowerCase();
  //     var y = b.type.toLowerCase();
  //     if (x < y) {return -1;}
  //     if (x > y) {return 1;}
  //     return 0;
  //   });
  //   displayCars();
  // }

  async componentDidMount() {
    await this.props.getJewellery();
    this.setState({ products: this.props.jewellery });
  }

  render() {
    const { products } = this.state;
    if (products.length === 0) {
      return (
        <div className={styles.jewellery}>
          <img className={styles.jewelimg} src={jewelleryimg} alt="jewellery" />
          <h1 className={styles.heading}>Jewellery</h1>
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
      <div className={styles.jewellery}>
        <img className={styles.jewelimg} src={jewelleryimg} alt="jewellery"/>
        <h1 className={styles.heading}>Jewellery</h1>
        <div className={styles.container}>
          <div className={styles.inner}>
            {products &&
              products.map(product => (
                <div className={styles.product} key={product.id}>
                  <div className={styles.image}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.photoURL}
                        alt={product.title}
                        loading="lazy"
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
                        {Math.round(product.price -
                          (product.price * product.discount) / 100)}{" "}
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

export default connect(mapState, actions)(Jewellery);
