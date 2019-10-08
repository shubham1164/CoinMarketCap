import {createStore} from 'redux';
import reducer from '../Reducers/index';

const preloadedState = {
  cryptoName: undefined
}

export default store = createStore(reducer, preloadedState);
