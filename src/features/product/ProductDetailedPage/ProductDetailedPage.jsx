import React, { Component } from 'react'
import { compose } from 'redux';
import { objectToArray } from '../../../app/common/util/helpers';
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist, addReview, removeReview } from '../../user/userActions';
import ProductDetailedInfo from './ProductDetailedInfo';
import styles from './ProductDetailedPage.module.css';
import ProductReviews from './ProductReviews';
import ProductReviewForm from './ProductReviewForm';
import ProductRelatedItems from './ProductRelatedItems';

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.id;

  let product = {};

  if (
    state.firestore.ordered.products &&
    state.firestore.ordered.products.length > 0
  ) {
    product =
      state.firestore.ordered.products.filter(product => product.id === productId)[0] || state.relatedItems.filter(product => product.id === productId)[0] ||
      {};
  }

  let ivalues = {quantity: 1};

  return {
    product,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    initialValues: ivalues
  };
};

const actions = {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  addReview,
  removeReview
};

class ProductDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`products/${match.params.id}`);
  }

  async componentWillUnmount(){
    const { firestore, match } = this.props;
    await firestore.unsetListener(`products/${match.params.id}`);
  }
  render() {
    const {
      product,
      auth,
      addToCart,
      addToWishlist,
      addReview,
      removeReview,
      removeFromWishlist,
      profile,
      initialValues
    } = this.props;
    const wishlisters = product && product.wishlistAdders && objectToArray(product.wishlistAdders);
    const carters= profile.cart && objectToArray(profile.cart)
    const isCarter = carters && carters.some(a => a.id === product.id)
    const isWishLister = wishlisters && wishlisters.some(a => a.id === auth.uid);
    const reviews = product && product.reviews && objectToArray(product.reviews);
    const isReviewer = reviews && reviews.some(a => a.id === auth.uid);
    return (
      <div>
      {product.title &&
        <div className={styles.container}>
        <ProductDetailedInfo initialValues={initialValues} product={product} isCarter={isCarter} isWishLister={isWishLister} addToCart={addToCart} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist}/>
        <ProductRelatedItems product={product}/>
        <h1>Reviews</h1>
        <ProductReviews reviews={reviews} removeReview={removeReview} isReviewer={isReviewer} product={product}/>
        <ProductReviewForm addReview={addReview} product={product} isReviewer={isReviewer}/>
        
      </div>}
      </div>
    )
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
)(ProductDetailedPage);
