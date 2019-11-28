import { combineReducers } from 'redux';
import { reducer as FormReducer} from 'redux-form';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import productReducer from '../../features/product/productReducer';
import TopSellersReducer from '../../features/home/Categories/TopSellersReducer';
import BestOfferReducer from '../../features/home/Categories/BestOfferReducer'
import wishlistReducer from '../../features/wishlist/wishlistReducer';
import relatedItemReducers from '../../features/product/relatedItemsReducer';
import BeautyReducer from '../../features/product/Beauty/BeautyReducer';

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
  TopSellers: TopSellersReducer,
  BestOffer: BestOfferReducer,
  beauty: BeautyReducer,
  relatedItems: relatedItemReducers
})

export default rootReducer