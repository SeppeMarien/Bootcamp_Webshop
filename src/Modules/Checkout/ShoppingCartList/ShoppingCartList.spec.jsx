import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import ShoppingCartList from './ShoppingCartList';
import { renderWithRedux } from '../../../../test/react-testing-helpers';

const renderCheckoutList = (initialState = { products: {} }) => {
  return renderWithRedux(<ShoppingCartList />, { initialState });
};

function products() {
  return {
    1: { product: { id: 1, name: 'fanta', image: 'qewr', sku: 'asdf', price: 2 }, amount: 1 },
    3: { product: { id: 3, name: 'cola', image: 'zxcv', sku: 'tyui', price: 20 }, amount: 4 },
  };
}
describe('Shoping cart list', () => {
  test('Loads by default', () => {
    const { container } = renderCheckoutList();

    expect(container).not.toBeEmpty();
  });

  test('it should render a list with the choosen products', () => {
    const { getByRole, queryByText, queryByAltText } = renderCheckoutList({ products: products() });

    getByRole('table');
    const productName = queryByText('cola');
    const productImage = queryByAltText('cola');
    const productPrice = queryByText(/20/i);
    const productQuantity = queryByText('4');
    const productSku = queryByText('tyui');

    expect(productName).not.toBeNull();
    expect(productImage).not.toBeNull();
    expect(productPrice).not.toBeNull();
    expect(productQuantity).not.toBeNull();
    expect(productSku).not.toBeNull();
  });

  test('It removes an item from the list', () => {
    const { getByTestId, queryByText, queryByAltText } = renderCheckoutList({ products: products() });

    const button = getByTestId('button3');
    fireEvent.click(button);

    const productName = queryByText('cola');
    const productImage = queryByAltText('cola');
    const productPrice = queryByText('20');
    const productQuantity = queryByText('4');
    const productSku = queryByText('tyui');

    expect(productName).toBeNull();
    expect(productImage).toBeNull();
    expect(productPrice).toBeNull();
    expect(productQuantity).toBeNull();
    expect(productSku).toBeNull();
  });
});
