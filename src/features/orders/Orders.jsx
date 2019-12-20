import React, { Component } from 'react';
import styles from './Orders.module.css';
import { getOrders, setDelivered, setApproved } from './orderActions.js';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import format from 'date-fns/format';

const mapState = state => ({
  orders: state.orders
});

const actions = {
  getOrders,
  setDelivered,
  setApproved
};

class Orders extends Component {
  componentDidMount(){
    this.props.getOrders()
  }

  render() {
    const {orders, setDelivered, setApproved} = this.props;
    return (
      <div>
        {orders && orders.map(order => (
          <div className={styles.order} key={order.id}>
            <div>{order.name}</div>
            <div>{order.amount}KSH</div>
            <div>{format(order.date.toDate(), 'do LLL yyyy')}</div>
            <div>{order.newAddressTwo.Name}</div>
            <div>status :{order.status}</div>
            <Button onClick={() => setDelivered(order)}>Delivered</Button>
            <Button onClick={() => setApproved(order)}>Approved</Button>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapState, actions)(Orders);