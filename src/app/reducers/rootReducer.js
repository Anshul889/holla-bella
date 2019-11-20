import { combineReducers } from 'redux';
import { reducer as FormReducer} from 'redux-form';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import productReducer from '../../features/product/productReducer';
import booksReducer from '../../features/home/Categories/booksReducer';
import electronicsReducer from '../../features/home/Categories/electronicsReducer'
import wishlistReducer from '../../features/wishlist/wishlistReducer';
import relatedItemReducers from '../../features/product/relatedItemsReducer';

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  products: productReducer,
  form: FormReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  books: booksReducer,
  electronics: electronicsReducer,
  relatedItems: relatedItemReducers
})

export default rootReducer