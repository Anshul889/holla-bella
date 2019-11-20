import React, { Component } from "react";
import styles from "./TopSellers.module.css";
import { Link } from "react-router-dom";
import { getTopSellersForHomepage } from "./TopSellersActions";
import { connect } from "react-redux";
import { Placeholder } from "semantic-ui-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const mapState = state => ({
  TopSellers: state.TopSellers,
  TopSellersloading: state.async.loading
});

const actions = {
  getTopSellersForHomepage
};

class TopSellers extends Component {
  async componentDidMount() {
    if (this.props.TopSellers && this.props.TopSellers.length === 0) {
      this.props.getTopSellersForHomepage();
    }
  }

  render() {
    const { TopSellers } = this.props;
    if (TopSellers.length === 0) {
      return (
        <div className={styles.container}>
          <h2>TopSellers</h2>
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
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <h2>TopSellers</h2>
        <div className={styles.inner}>
          {TopSellers &&
            TopSellers.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    {/* <img src={product.photoURL} alt={product.description} /> */}
                    <LazyLoadImage
                      alt={product.description}
                      src={product.photoURL}
                      width="100%"
                      effect="blur"
                    />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h3>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TopSellers);