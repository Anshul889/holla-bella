import {FETCH_EMAILS} from './notifypeopleConstants.js';
import { createReducer } from '../../app/common/util/reducerUtils';

const initialState = [];

const fetchEmails = (state, payload) => {
  return payload.emails;
};

export default createReducer(initialState, {
  FETCH_EMAILS: fetchEmails
})