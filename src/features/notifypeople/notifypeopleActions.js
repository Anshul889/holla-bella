import { FETCH_EMAILS } from "./notifypeopleConstants";
import firebase from "../../app/config/firebase";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

export const getNotify = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let ordersQuery = await firestore.collection("products").orderBy("notify", "asc").get();
    let emails = [];

    for (let i = 0; i < ordersQuery.docs.length; i++) {
      let email = { ...ordersQuery.docs[i].data(), id: ordersQuery.docs[i].id };
      emails.push(email);
    }
    dispatch({ type: FETCH_EMAILS, payload: { emails } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};