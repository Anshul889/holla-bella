import React, { Component } from 'react';
import styles from './Orders.module.css';
import { getOrders } from './orderActions.js';
import { connect } from 'react-redux';

const mapState = state => ({
  orders: state.orders
});

const actions = {
  getOrders
};

class Orders extends Component {
  componentDidMount(){
    this.props.getOrders()
  }

  render() {
    const {orders} = this.props;
    return (
      <div>
        {orders && orders.map(order => (
          <div className={styles.order} key={order.id}>
            <div>{order.name}</div>
            <div>{order.amount}</div>
            <div>{order.date}</div>
            <div>{order.newAddressTwo.Name}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapState, actions)(Orders);