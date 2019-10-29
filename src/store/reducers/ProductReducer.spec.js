import productReducer from './ProductReducer';
import { addProduct, removeProduct } from '../Actions/ProductActions';

test('returns state by default', () => {
  const prevState = { id: 3 };
  const newState = productReducer(prevState);
  expect(newState).toEqual(prevState);
});

test('returns initial state', () => {
  const newState = productReducer();
  expect(newState).toEqual({});
});

describe('ADD_PRODUCT', () => {
  test('ADD_PRODUCT adds a product to a new list', () => {
    const prevState = {};
    const product = { id: 3, name: 'cola' };
    const newState = productReducer(prevState, addProduct(product));
    expect(newState).toEqual({ 3: { product: { id: 3, name: 'cola' }, amount: 1 } });
  });

  test('ADD_PRODUCT adds a product to an existing list', () => {
    const prevState = { 1: { product: { id: 1, name: 'fanta' }, amount: 1 } };
    const product = { id: 3, name: 'cola' };
    const expectedNewState = {
      1: { product: { id: 1, name: 'fanta' }, amount: 1 },
      3: { product: { id: 3, name: 'cola' }, amount: 1 },
    };
    const newState = productReducer(prevState, addProduct(product));
    expect(newState).toEqual(expectedNewState);
  });

  test('ADD_PRODUCT raises the amount of a product to an existing list', () => {
    const product = { id: 3, name: 'cola' };
    const prevState = {
      1: { product: { id: 1, name: 'fanta' }, amount: 1 },
      3: { product: { id: 3, name: 'cola' }, amount: 1 },
    };
    const newState = productReducer(prevState, addProduct(product));
    expect(newState[3].amount).toEqual(2);
  });

  describe('REMOVE_PRODUCT', () => {
    test('REMOVE_PRODUCT removes a product from an existing list', () => {
      const prevState = {
        1: { product: { id: 1, name: 'fanta' }, amount: 1 },
        3: { product: { id: 3, name: 'cola' }, amount: 1 },
      };
      const expectedNewState = {
        1: { product: { id: 1, name: 'fanta' }, amount: 1 },
      };
      const newState = productReducer(prevState, removeProduct(3));
      expect(newState).toEqual(expectedNewState);
    });
  });
});
