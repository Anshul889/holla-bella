import React, { Component } from 'react';
import styles from './BestOffer.module.css';
import { Link } from 'react-router-dom';
import { getbestOfferForHomepage } from './BestOfferActions';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const mapState = state => ({
  bestOffer: state.BestOffer
});

const actions = {
  getbestOfferForHomepage
};

class BestOffer extends Component {
  async componentDidMount() {
    if (this.props.bestOffer && this.props.bestOffer.length === 0) {
      this.props.getbestOfferForHomepage();
    }
  }

  render() {
    const { bestOffer } = this.props;
    if (bestOffer.length === 0) {
      return (
        <div className={styles.container}>
          <h2>Best Offer</h2>
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
        <h2>Best Offer</h2>
        <div className={styles.inner}>
          {bestOffer &&
            bestOffer.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    {/* <img src={product.photoURL} alt={product.description} /> */}
                    <LazyLoadImage
                      alt={product.description}
                      src={product.photoURL}
                      width='100%'
                      effect='blur'
                    />
                  </Link>
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </div>
                  <div className={styles.price}>
                    <Link to={`/product/${product.id}`}>
                      {product.price - product.price / product.discount} KSH
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(BestOffer);
