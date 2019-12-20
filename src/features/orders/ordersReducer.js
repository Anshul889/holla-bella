import { createReducer } from '../../app/common/util/reducerUtils';
import { FETCH_ORDERS } from './orderConstants';

const initialState = [];

const fetchOrders = (state, payload) => {
  return payload.orders;
};

export default createReducer(initialState, {
  [FETCH_ORDERS]: fetchOrders,
});