import { addProduct, removeProduct } from './ProductActions';
import { ADD_PRODUCT, REMOVE_PRODUCT } from './actionTypes';

const product = {
  id: 6,
  sku: '422252776-9',
  title: 'imperdiet',
  desc: 'Fusce',
  image: 'https://dummyimage.com/300x300.jpg/afafaf/000000',
  stocked: true,
  basePrice: 18.31,
  price: 10.07,
};

test('addproduct', () => {
  const action = addProduct(product);
  expect(action).toEqual({
    type: ADD_PRODUCT,
    payload: product,
  });
});

test('removeProduct', () => {
  const action = removeProduct(product.id);
  expect(action).toEqual({
    type: REMOVE_PRODUCT,
    payload: product.id,
  });
});
