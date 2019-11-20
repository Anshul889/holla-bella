import { FETCH_BOOKS } from './booksConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getBooksForHomepage = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let booksQuery = await firestore
      .collection('products')
      .where('category', '==', 'books')
      .limit(5)
      .get();
    let books = [];

    for (let i = 0; i < booksQuery.docs.length; i++){
      let book = { ...booksQuery.docs[i].data(), id: booksQuery.docs[i].id };
      books.push(book);
    }
    dispatch({type : FETCH_BOOKS, payload: {books}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
