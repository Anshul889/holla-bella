import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_ELECTRONICS } from './electronicsConstants';

const initialState = [];

const fetchElectronics = (state, payload) => {
  return payload.electronics;
};

export default createReducer(initialState, {
  [FETCH_ELECTRONICS]: fetchElectronics,
});
