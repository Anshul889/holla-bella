import { FETCH_ORDERS } from './orderConstants';
import firebase from '../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';

export const getOrders = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let ordersQuery = await firestore
      .collection('orders')
      .get();
    let orders = [];

    for (let i = 0; i < ordersQuery.docs.length; i++){
      let order = { ...ordersQuery.docs[i].data(), id: ordersQuery.docs[i].id };
      orders.push(order);
    }
    dispatch({type : FETCH_ORDERS, payload: {orders}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};