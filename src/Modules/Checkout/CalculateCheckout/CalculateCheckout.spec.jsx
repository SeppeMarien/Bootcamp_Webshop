import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import CalculateCheckout from './CalculateCheckout';
import { renderWithRedux } from '../../../../test/react-testing-helpers';

const renderCheckoutList = (initialState = { products: {} }) => {
  return renderWithRedux(<CalculateCheckout />, { initialState });
};

function products() {
  return {
    1: { product: { id: 1, name: 'fanta', image: 'qewr', sku: 'asdf', price: 6 }, amount: 11 },
    3: { product: { id: 3, name: 'cola', image: 'zxcv', sku: 'tyui', price: 30 }, amount: 20 },
  };
}

function productsWithTotalPriceLowerThan40() {
  return {
    1: { product: { id: 1, name: 'fanta', image: 'qewr', sku: 'asdf', price: 6 }, amount: 1 },
    3: { product: { id: 3, name: 'cola', image: 'zxcv', sku: 'tyui', price: 30 }, amount: 1 },
  };
}
describe('Calculate checkout', () => {
  test('Loads by default', () => {
    const { container } = renderCheckoutList();

    expect(container).not.toBeEmpty();
  });

  test('It calculates the total', () => {
    const { getByText, getByTestId } = renderCheckoutList({ products: products() });

    getByText('Total:');
    const total = getByTestId('total');
    expect(+total.innerHTML).toBe(666);
  });

  test('it shows the shipping cost', () => {
    const { getByText, getByTestId } = renderCheckoutList();

    getByText('Shipping cost:');
    getByTestId('shippingCost');
  });

  test('it shows the total with shipping cost', () => {
    const { getByText, getByTestId } = renderCheckoutList({ products: products() });

    getByText('Total with Shipping cost:');
    const totalWithShipping = getByTestId('totalWithShipping');

    expect(+totalWithShipping.innerHTML).toBe(666);
  });

  test('It should at the shipping cost when the total is lower than 40', () => {
    const { getByText, getByTestId } = renderCheckoutList({ products: productsWithTotalPriceLowerThan40() });

    getByText('Total with Shipping cost:');
    const totalWithShipping = getByTestId('totalWithShipping');

    expect(+totalWithShipping.innerHTML).toBe(46);
  });

  test('It should render the button to pay', () => {
    const { getByRole } = renderCheckoutList();

    const button = getByRole('button');

    expect(button).toHaveTextContent('proceed to checkout');
  });
});
