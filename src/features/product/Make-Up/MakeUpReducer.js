import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_MAKEUP } from './MakeUpConstants';

const initialState = [];

const fetchMakeUp = (state, payload) => {
  return payload.makeUp;
};

export default createReducer(initialState, {
  [FETCH_MAKEUP]: fetchMakeUp,
});