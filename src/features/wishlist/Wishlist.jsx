import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  getUserWishlist,
  removeFromWishlist,
  addToCart
} from "../../features/user/userActions";
import { compose } from "redux";
import styles from "./Wishlist.module.css";
import { Link } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => ({
  profile: state.firebase.profile,
  userUid: state.firebase.auth.uid,
  wishlist: state.wishlist,
  auth : state.firebase.auth,
  loading: !state.async.loading
});

const actions = {
  getUserWishlist,
  removeFromWishlist,
  addToCart
};

class Wishlist extends Component {
  async componentDidMount() {
    if (this.props.wishlist && this.props.wishlist.length === 0 && this.props.auth.isLoaded) {
      await this.props.getUserWishlist(this.props.userUid);
    }
  }

  render() {
    const { wishlist, removeFromWishlist, addToCart , auth, loading } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    let values = { quantity: 1 };
    if (wishlist && wishlist.length === 0 && loading) {
      return (
        <div>
          <h1 className={styles.heading}>Wishlist</h1>
          <div className={styles.wishempty}>Your wishlist is empty!</div>
        </div>
      );
    }

    if (!loading){
      return (
        <div>
          <h1 className={styles.heading}>Wishlist</h1>
          <div className={styles.wishempty}><Loader active={true} /></div>
        </div>
      );
    }

    if (!authenticated) {
      return (
        <div>
          <h1 className={styles.heading}>Wishlist</h1>
          <div className={styles.wishempty}>Your wislist is empty!</div>
        </div>
      );
    }

    return (
      <div>
        <h1 className={styles.heading}>Wishlist</h1>
        <div className={styles.container}>
          <div className={styles.inner}>
            {wishlist &&
              wishlist.map(product => (
                <div className={styles.product} key={product.id}>
                  <div className={styles.image}>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.photoURL} alt={product.description} loading='lazy'/>
                    </Link>
                  </div>
                  <div className={styles.content}>
                    <h3>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h3>
                    <p>
                      {product.price - (product.price * product.discount) / 100}{" "}
                      KSH
                    </p>
                    <Button
                      onClick={() => removeFromWishlist(product)}
                      content={"Remove from Wishlist"}
                    />
                    <Button
                      onClick={() => addToCart(product, values)}
                      content={"Add to cart"}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect()
)(Wishlist);
