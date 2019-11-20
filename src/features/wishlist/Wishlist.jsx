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
import { Button } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => ({
  profile: state.firebase.profile,
  userUid: state.firebase.auth.uid,
  wishlist: state.wishlist
});

const actions = {
  getUserWishlist,
  removeFromWishlist,
  addToCart
};

class Wishlist extends Component {
  state = {
    loadingInitial: true
  };
  async componentDidMount() {
    if (this.props.wishlist && this.props.wishlist.length === 0){
    await this.props.getUserWishlist(this.props.userUid);
    }
    this.setState({ loadingInitial: false });
  }

  render() {
    const { wishlist, removeFromWishlist, addToCart } = this.props;
    let values = {quantity: 1};
    if (this.state.loadingInitial) return <LoadingComponent />;
    if (wishlist && wishlist.length === 0) {
      return <div>Your wishlist is empty!</div>;
    }
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          {wishlist &&
            wishlist.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.photoURL} alt={product.description} />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h3>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p>{product.description}</p>
                  <p>{product.price - (product.price / product.discount)} KSH</p>
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
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect()
)(Wishlist);
