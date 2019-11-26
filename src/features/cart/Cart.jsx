import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  removeFromCart,
  confirmOrder,
  addQuantity,
  subtractQuantity
} from '../../features/user/userActions';
import { compose } from 'redux';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { objectToArray } from '../../app/common/util/helpers';
import UserAddressForm from '../user/UserDetailed/UserAddressForm';

const mapState = (state, ownProps) => ({
  address: state.firebase.profile.newAddress,
  cart: objectToArray(state.firebase.profile.cart) || [],
  cartob: state.firebase.profile.cart,
  loading: !state.async.loading
});

const actions = {
  removeFromCart,
  confirmOrder,
  addQuantity,
  subtractQuantity
};

class Cart extends Component {
  state = {
    isAddressOneOpen: false,
    isAddressTwoOpen: false
  };

  closeForm = () => {
    this.setState({ isAddressOneOpen: false });
  };

  render() {
    const {
      removeFromCart,
      cart,
      address,
      confirmOrder,
      cartob,
      loading,
      addQuantity,
      subtractQuantity
    } = this.props;
    let totalCartPrice =
      cart &&
      cart.length !== 0 &&
      cart.map(item => item.totalPrice).reduce((prev, next) => prev + next);
    
    let shipping;
    if (totalCartPrice < 200) {
      shipping = 50;
    } else {
      shipping = 0;
    }
    const totalAmount = cart && cart.length !== 0 && shipping + totalCartPrice;
    if (cart && cart.length === 0 && loading) {
      return <div>Your cart is empty!</div>;
    } else if (!cart && loading) {
      return <div>Your cart is empty!</div>;
    }
    return (
      <div>
       <h1 className={styles.heading}>
         Shopping Cart
       </h1>
      <div className={styles.container}>
        <div className={styles.inner}> 
          {cart &&
            cart.length !== 0 &&
            cart.map(product => (
              <div className={styles.product} key={product.id}>
                <div className={styles.image}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.photoURL} alt={product.title} />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h4>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h4>
                  <span>
                    Quantity :{' '}
                    {product.quantity > 1 && (
                      <span onClick={() => subtractQuantity(product)}>-</span>
                    )}
                    {product.quantity}{' '}
                    {product.quantity < 10 && (
                      <span onClick={() => addQuantity(product)}>+</span>
                    )}
                  </span>
                  <p>
                    {product.price - (product.price * product.discount) / 100}{' '}
                    KSH
                  </p>
                  <Button
                    onClick={() => removeFromCart(product)}
                    content={'Remove'}
                  />
                  <Link to={`/product/${product.id}`}>
                    <Button>Edit Quantity</Button>
                  </Link>
                </div>
              </div>
            ))}
          {cart.length !== 0 && (
            <h3>
              Shipping :{' '}
              {shipping > 0 ? (
                <div>
                  <span>Rs 50</span>
                  <p>Get Free shipping on orders above Rs200</p>
                </div>
              ) : (
                <span>Free</span>
              )}{' '}
            </h3>
          )}
          {cart.length !== 0 && <h2>Total Price = {totalAmount} KSH</h2>}
        </div>
        {cart.length !== 0 && !address && (
          <div>
            <p>Add Delivery Address To pay with Mpesa</p>
            <Button
              onClick={() =>
                this.setState({
                  isAddressOneOpen: !this.state.isAddressOneOpen,
                  isAddressTwoOpen: false
                })
              }
              color='teal'
              size='tiny'
              content={'Add Delivery Address to pay with mpesa'}
            />
          </div>
        )}
        {cart.length !== 0 && address && (
          <div>
            <div>Deliver to this address</div>
            <span>{address.Name} </span>
            <span>{address.City} </span>
            <span>{address.postcode} </span>
          </div>
        )}
        {this.state.isAddressOneOpen && (
          <UserAddressForm closeForm={this.closeForm} />
        )}
        {cart && address && (
          <Button
            loading={!loading}
            onClick={() => confirmOrder(totalAmount, cartob, address)}
            content='Purchase with mpesa'
          />
        )}
      </div>
      </div>
    );
  }
}

export default compose(connect(mapState, actions), firestoreConnect())(Cart);
