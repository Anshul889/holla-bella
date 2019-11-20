import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import firebase from "../../app/config/firebase";
import { ADD_TO_WISHLIST, FETCH_WISHLIST, DELETE_TO_WISHLIST } from "../wishlist/wishlistConstants";

export const addToCart = (product, values) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const newProduct = {
    ...product,
    quantity: values.quantity,
    totalPrice: values.quantity * product.price,
    addDate: firestore.FieldValue.serverTimestamp()
  }
  try {
    await firestore.update(`users/${user.uid}`, {
      [`cart.${product.id}`]: newProduct
    });
    dispatch(asyncActionFinish());
    toastr.success(' ',`${product.title} has been added to the cart`);
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error("Oops", "Problem adding item to the cart");
  }
};

export const removeFromCart = product => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`users/${user.uid}`, {
      [`cart.${product.id}`]: firestore.FieldValue.delete()
    });
    toastr.success(' ',`${product.title} has been removed to the cart`);

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "something went wrong");
  }
};

export const addToWishlist = product => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const wishlistAdder = {
    isWishList: true,
    addDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/assets/user.png",
    displayName: profile.displayName
  };
  try {
    await firestore.update(`products/${product.id}`, {
      [`wishlistAdders.${user.uid}`]: wishlistAdder
    });
    await firestore.set(`wishlist/${product.id}_${user.uid}`, {
      productId: product.id,
      userUid: user.uid
    });
    dispatch({type: ADD_TO_WISHLIST, payload: product})
    dispatch(asyncActionFinish());
    toastr.success(' ',`${product.title} has been added to the cart`);
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error("Oops", "Problem adding item to the wishlist");
  }
};

export const getUserWishlist = userUid => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  let cartRef = firestore.collection("wishlist");
  let query = cartRef.where("userUid", "==", userUid);
  try {
    let querySnap = await query.get();
    let products = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let pro = await firestore
        .collection("products")
        .doc(querySnap.docs[i].data().productId)
        .get();
      products.push({ ...pro.data(), id: pro.id });
    }

    dispatch({ type: FETCH_WISHLIST, payload: { products } });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const removeFromWishlist = product => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  dispatch({ type: DELETE_TO_WISHLIST, payload: product });
  try {
    await firestore.update(`products/${product.id}`, {
      [`wishlistAdders.${user.uid}`]: firestore.FieldValue.delete()
    });
    await firestore.delete(`wishlist/${product.id}_${user.uid}`);
    toastr.success(' ',`${product.title} has been removed from the wishlist`);
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "something went wrong");
  }
};

export const addReview = (product, values) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch(asyncActionStart());
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const profile = getState().firebase.profile;
    const newReview = {
      rating: values.rating,
      comment: values.comment,
      addDate: firestore.FieldValue.serverTimestamp(),
      photoURL: profile.photoURL || "assests/user.png",
      displayName: profile.displayName
    };
    try {
      await firestore.update(`products/${product.id}`, {
        [`reviews.${user.uid}`]: newReview
      });
      await firestore.set(`review/${product.id}_${user.uid}`, {
        productId: product.id,
        userUid: user.uid
      });
      dispatch(asyncActionFinish());
      toastr.success("Success!", "Review has been added");
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const addAddress = values => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const newAddress = values
    try {
      await firestore.update(`users/${user.uid}`, {
        newAddress,
        email: newAddress.email
      });
      dispatch(asyncActionError());
      toastr.success("Success!", "Address has been added")
    } catch(error){
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const addAddressTwo = values => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const newAddressTwo = values
    try {
      await firestore.update(`users/${user.uid}`, {
        newAddressTwo
      });
      dispatch(asyncActionError());
      toastr.success("Success!", "Address Two has been added")
    } catch(error){
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const removeNewAddress = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`users/${user.uid}`, {
      [`newAddress`]: firestore.FieldValue.delete()
    });
    toastr.success(' ',`Your address has been removed`);

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "something went wrong");
  }
};

export const removeNewAddressTwo = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`users/${user.uid}`, {
      [`newAddressTwo`]: firestore.FieldValue.delete()
    });
    toastr.success(' ',`Your address has been removed`);

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "something went wrong");
  }
};

export const removeReview = product => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  dispatch(asyncActionStart());
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`products/${product.id}`, {
      [`reviews.${user.uid}`]: firestore.FieldValue.delete()
    });
    await firestore.delete(`review/${product.id}_${user.uid}`);
    toastr.success(' ',`Your review of ${product.title} has been removed`);
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "something went wrong");
  }
};

export const confirmOrder = (totalAmount, cartob, address) => async (
  dispatch, getState, { getFirestore, getFirebase}) => {
    dispatch(asyncActionStart());
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const products = cartob
    try {
      await firestore.add(
        {
          collection: 'users',
          doc: user.uid,
          subcollections: [{ collection: 'confirmed_orders' }]
        },
        {
          products,
          amount : totalAmount,
          street: address.Address,
          city: address.City,
          name: address.Name,
          postcode: address.postcode,
          phone: address.phone,
          email: address.email,
          date: firestore.FieldValue.serverTimestamp()
        }
      );
      await firestore.update(`users/${user.uid}`, {
        [`cart`]: {}
      });
      dispatch(asyncActionFinish());
      toastr.success('', 'Your order is complete!');
      } catch (error){
      console.log(error);
      toastr.error("Oops", 'something went wrong');
    }
  }