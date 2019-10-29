import { ADD_PRODUCT, REMOVE_PRODUCT } from './actionTypes';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

export function removeProduct(productId) {
  return {
    type: REMOVE_PRODUCT,
    payload: productId,
  };
}
