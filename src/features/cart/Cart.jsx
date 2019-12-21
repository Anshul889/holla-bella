import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import {
  removeFromCart,
  confirmOrder,
  addQuantity,
  subtractQuantity,
  removeMpesaNumber
} from "../../features/user/userActions";
import { compose } from "redux";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { objectToArray } from "../../app/common/util/helpers";
import UserAddressForm from "../user/UserDetailed/UserAddressForm";
import { Loader } from "semantic-ui-react";
import MpesaForm from "./MpesaForm";

const mapState = (state, ownProps) => ({
  address: state.firebase.profile.newAddress,
  cart: objectToArray(state.firebase.profile.cart) || [],
  cartob: state.firebase.profile.cart,
  loading: !state.async.loading,
  mpesanumber: state.firebase.profile.mpesanumber,
  verificationCode: state.firebase.profile.verification
});

const actions = {
  removeFromCart,
  confirmOrder,
  addQuantity,
  subtractQuantity,
  removeMpesaNumber
};

class Cart extends Component {
  state = {
    isAddressOneOpen: false,
    isAddressTwoOpen: false,
    isMpesaFormOpen: false
  };

  closeForm = () => {
    this.setState({ isAddressOneOpen: false });
  };

  closeMpesaForm = () => {
    this.setState({isMpesaFormOpen: false})
  }

  render() {
    const {
      removeFromCart,
      cart,
      address,
      confirmOrder,
      cartob,
      loading,
      addQuantity,
      subtractQuantity,
      mpesanumber,
      removeMpesaNumber,
      verificationCode
    } = this.props;
    let totalCartPrice =
      cart &&
      cart.length !== 0 &&
      Math.round(
        cart.map(item => item.totalPrice).reduce((prev, next) => prev + next)
      );

    let shipping;
    if (totalCartPrice < 1000) {
      shipping = 300;
    } else {
      shipping = 0;
    }
    const totalAmount =
      cart && cart.length !== 0 && Math.round(shipping + totalCartPrice + 16*totalCartPrice/100);

    let payButton;
    if (cart && address && mpesanumber && loading) {
      payButton = (
        <div className={styles.pay}>
          <button
            className={styles.addbutton}
            onClick={() => confirmOrder(totalAmount, cartob, address, mpesanumber, verificationCode)}
          >
            Confirm Order
          </button>
        </div>
      );
    } else if (cart && !address && loading) {
      payButton = null;
    } else if (cart && address && !loading) {
      payButton = (
        <div className={styles.pay}>
          <button className={styles.loadbutton} disabled>
            <span>Loading</span>
          </button>
        </div>
      );
    }

    if (cart && cart.length === 0 && loading) {
      return (
        <div>
          <h1 className={styles.heading}>Shopping Cart</h1>
          <div className={styles.categories}>
            <div>Product</div>
            <div>Qnt:</div>
            <div>Price</div>
          </div>
          <div className={styles.cartempty}>Your Cart is empty</div>
          <div className={styles.container}>
            <div className={styles.totalcartprice}>
              <div className={styles.subtotal}>Subtotal: </div>
              <div className={styles.totalpricenumber}>0 KSH</div>
            </div>
          </div>
        </div>
      );
    } else if (!cart && loading) {
      return (
        <div>
          <h1 className={styles.heading}>Shopping Cart</h1>
          <div className={styles.categories}>
            <div>Product</div>
            <div>Qnt:</div>
            <div>Price</div>
          </div>
          <div className={styles.cartempty}>Your Cart is empty</div>
          <div className={styles.container}>
            <div className={styles.totalcartprice}>
              <div className={styles.subtotal}>Subtotal: </div>
              <div className={styles.totalpricenumber}>0 KSH</div>
            </div>
          </div>
        </div>
      );
    } else if (cart && cart.length === 0 && !loading){
      return (
        <div>
          <h1 className={styles.heading}>Shopping Cart</h1>
          <div className={styles.categories}>
            <div>Product</div>
            <div>Qnt:</div>
            <div>Price</div>
          </div>
          <div className={styles.cartempty}><Loader active={true} content="Loading" /></div>
          <div className={styles.container}>
            <div className={styles.totalcartprice}>
              <div className={styles.subtotal}>Subtotal: </div>
              <div className={styles.totalpricenumber}>0 KSH</div>
            </div>
          </div>
        </div>
      );
      }

    return (
      <div>
        <h1 className={styles.heading}>Shopping Cart</h1>
        {cart && cart.length !== 0 && (
          <div className={styles.categories}>
            <div>Product</div>
            <div>Qnt:</div>
            <div>Price</div>
          </div>
        )}
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
                  <div className={styles.title}>
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </div>
                  <div className={styles.quantity}>
                    {product.quantity > 1 ? (
                      <button onClick={() => subtractQuantity(product)}>
                        -
                      </button>
                    ) : (
                      <button>-</button>
                    )}{" "}
                    {product.quantity}{" "}
                    {product.quantity < 10 && (
                      <button onClick={() => addQuantity(product)}>+</button>
                    )}
                  </div>
                  <div className={styles.price}>
                    {Math.round(
                      product.quantity *
                        (product.price -
                          (product.price * product.discount) / 100)
                    )}{" "}
                    KSH
                  </div>
                  <div
                    className={styles.delete}
                    onClick={() => removeFromCart(product)}
                  >
                    delete
                  </div>
                </div>
              ))}
          </div>
          {cart.length !== 0 && { totalAmount } && (
            <div className={styles.totalcartprice}>
              <div className={styles.subtotal}>Subtotal: </div>
              <div className={styles.totalpricenumber}>
                {totalCartPrice} KSH
              </div>
            </div>
          )}
          {cart.length !== 0 && (
            <div className={styles.shippingc}>
              Shipping :
              {shipping > 0 ? (
                <>
                  <div className={styles.shippingp}>300 KSH</div>
                  <div className={styles.shippingw}>
                    Free shipping on orders above 1000 KSH
                  </div>
                </>
              ) : (
                <div className={styles.shippingp}>Free</div>
              )}
            </div>
          )}
          {cart.length !== 0 && (
            <div className={styles.shippingc} style={{paddingTop: '0px'}}>
              Vat(16%) :
                <div className={styles.shippingp}>{Math.round(16* totalCartPrice/100)} KSH</div>
            </div>
          )}
        </div>
        <div className={styles.total}>
          <div className={styles.innertotal}>
            <div>Total:</div>
            <div>{totalAmount} KSH</div>
          </div>
        </div>

        {cart.length !== 0 && !address && (
          <div className={styles.addaddress}>
            <p>Add Delivery Address</p>
            <button
              className={styles.addbutton}
              onClick={() =>
                this.setState({
                  isAddressOneOpen: !this.state.isAddressOneOpen,
                  isAddressTwoOpen: false
                })
              }
            >
              Add Address
            </button>
          </div>
        )}
        {cart.length !== 0 && address && (
          <div className={styles.addressc}>
            <div className={styles.addtitle}>Deliver to:</div>
            <span>{address.Name} </span>
            <span>{address.City} </span>
            <span>{address.postcode} </span>
            <span  onClick={() =>
              this.setState({
                isAddressOneOpen: !this.state.isAddressOneOpen
              })
            } style={{color: '#c29957', fontWeight: '100', cursor: 'pointer', textDecoration: 'underline'}}>edit</span>
          </div>
        )}
        {this.state.isAddressOneOpen && (
          <UserAddressForm closeForm={this.closeForm} />
        )}
        {cart.length !== 0 && !verificationCode && address && (
          <div className={styles.addaddress}>
          <button
            className={styles.addbutton}
            onClick={() =>
              this.setState({
                isMpesaFormOpen: !this.state.isMpesaFormOpen
              })
            }
          >
            Add Mpesa Number
          </button>
        </div>
        )}
        {cart.length !==0 && mpesanumber && verificationCode && address && (
          <div className={styles.addressc}>
          <div className={styles.addtitle}>Mpesa Number</div>
          <span>+254{mpesanumber} </span>
          <span style={{color: '#c29957', fontWeight: '100', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => this.setState({
            isMpesaFormOpen: !this.state.isMpesaFormOpen
          })}> edit </span>
          <span onClick={() => {removeMpesaNumber()}} style={{color: 'red', fontWeight: '100', cursor: 'pointer',  textDecoration: 'underline'}}> delete </span>
        </div>
        )}
        {this.state.isMpesaFormOpen && (
          <MpesaForm closeMpesaForm={this.closeMpesaForm} />
        )}
        {payButton}
      </div>
    );
  }
}

export default compose(connect(mapState, actions), firestoreConnect())(Cart);
