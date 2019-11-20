import { FETCH_ELECTRONICS } from './electronicsConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getElectronicsForHomepage = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let electronicsQuery = await firestore
      .collection('products')
      .where('category', '==', 'electronics')
      .limit(5)
      .get();
    let electronics = [];

    for (let i = 0; i < electronicsQuery.docs.length; i++){
      let electronic = { ...electronicsQuery.docs[i].data(), id: electronicsQuery.docs[i].id };
      electronics.push(electronic);
    }
    dispatch({type : FETCH_ELECTRONICS, payload: {electronics}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
