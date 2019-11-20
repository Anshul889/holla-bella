import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_BOOKS } from './booksConstants';

const initialState = [];

const fetchBooks = (state, payload) => {
  return payload.books;
};

export default createReducer(initialState, {
  [FETCH_BOOKS]: fetchBooks,
});
