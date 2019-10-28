import productReducer from './ProductReducer';
// import { ADD_PRODUCT } from '../Actions/actionTypes';
// import {ADD_PRODUCT, REMOVE_PRODUCT} from "../Actions/actionTypes"

test('returns state by default', () => {
  const prevState = { id: 3 };
  const newState = productReducer(prevState);
  expect(newState).toEqual(prevState);
});

test('returns initial state', () => {
  const newState = productReducer();
  expect(newState).toEqual({});
});

test('ADD_PRODUCT', () => {});
