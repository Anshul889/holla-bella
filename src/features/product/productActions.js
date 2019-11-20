import { FETCH_PRODUCTS, FETCH_RELATED_ITEMS } from './productConstants';
import firebase from '../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';


export const getProductsForDashboard = lastProduct => async (
  dispatch,
  getState
) => {
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('products');
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastProduct &&
      (await firestore
        .collection('products')
        .doc(lastProduct.id)
        .get());
    let query;

    lastProduct
      ? (query = eventsRef
          .orderBy('price')
          .startAfter(startAfter)
          .limit(5))
      : (query = eventsRef
          .orderBy('price')
          .limit(5));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return;
    }

    let products = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let pro = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      products.push(pro);
    }
    dispatch({ type: FETCH_PRODUCTS, payload: { products } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getRelatedItems = (product) => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let relatedItemsQuery = await firestore
      .collection('products')
      .where('category', '==', product.category)
      .limit(5)
      .get();
    let relatedItems = [];

    for (let i = 0; i < relatedItemsQuery.docs.length; i++){
      let relatedItem = { ...relatedItemsQuery.docs[i].data(), id: relatedItemsQuery.docs[i].id };
      if(relatedItem.title !== product.title){
      relatedItems.push(relatedItem);
      }
    }
    dispatch({type : FETCH_RELATED_ITEMS, payload: {relatedItems}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};