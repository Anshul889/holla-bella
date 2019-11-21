import {FETCH_MAKEUP} from './MakeUpConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getMakeUp = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let makeUpQuery = await firestore
      .collection('products')
      .where('category', '==', 'earrings')
      .get();
    let makeUp = [];

    for (let i = 0; i < makeUpQuery.docs.length; i++){
      let make = { ...makeUpQuery.docs[i].data(), id: makeUpQuery.docs[i].id };
      makeUp.push(make);
    }
    dispatch({type : FETCH_MAKEUP, payload: {makeUp}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};