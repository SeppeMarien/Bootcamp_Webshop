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
    1: { product: { id: 1, name: 'fanta', image: 'qewr', sku: 'asdf', price: 9 }, amount: 1 },
    3: { product: { id: 3, name: 'cola', image: 'zxcv', sku: 'tyui', price: 30.99 }, amount: 1 },
  };
}

function productsWithTotalPrice40() {
  return {
    1: { product: { id: 1, name: 'fanta', image: 'qewr', sku: 'asdf', price: 10 }, amount: 1 },
    3: { product: { id: 3, name: 'cola', image: 'zxcv', sku: 'tyui', price: 30 }, amount: 1 },
  };
}
describe('Calculate checkout', () => {
  test('Loads by default', () => {
    const { container } = renderCheckoutList();

    expect(container).not.toBeEmpty();
  });

  test('It calculates the total', () => {
    const { getByTestId } = renderCheckoutList({ products: products() });

    const total = getByTestId('total');
    expect(total.innerHTML).toBe('€&nbsp;666');
  });

  test('it shows the shipping cost', () => {
    const { getByTestId } = renderCheckoutList();

    const shippingCost = getByTestId('shippingCost');

    expect(shippingCost).toBeInTheDocument();
  });

  test('it shows the total with shipping cost', () => {
    const { getByTestId } = renderCheckoutList({ products: products() });

    const totalWithShipping = getByTestId('totalWithShipping');
    const shippingCost = getByTestId('shippingCost');

    expect(shippingCost.innerHTML).toBe('€&nbsp;0');
    expect(totalWithShipping.innerHTML).toBe('€&nbsp;666');
  });

  test('It should add the shipping cost when the total is lower than 40', () => {
    const { getByTestId } = renderCheckoutList({ products: productsWithTotalPriceLowerThan40() });

    const totalWithShipping = getByTestId('totalWithShipping');
    const shippingCost = getByTestId('shippingCost');

    expect(shippingCost.innerHTML).toBe('€&nbsp;10');
    expect(totalWithShipping.innerHTML).toBe('€&nbsp;49.99');
  });

  test('It should not add the shipping cost when the total is 40', () => {
    const { getByTestId } = renderCheckoutList({ products: productsWithTotalPrice40() });

    const totalWithShipping = getByTestId('totalWithShipping');

    expect(totalWithShipping.innerHTML).toBe('€&nbsp;40');
  });

  test('It should render the button to pay', () => {
    const { getByRole } = renderCheckoutList();

    const button = getByRole('button');

    expect(button).toHaveTextContent('Proceed to checkout');
  });

  test('It should show zero for shipping cost when the total is zero', () => {
    const { getByTestId } = renderCheckoutList();

    const totalWithShipping = getByTestId('totalWithShipping');
    const shippingCost = getByTestId('shippingCost');

    expect(shippingCost.innerHTML).toBe('€&nbsp;0');
    expect(totalWithShipping.innerHTML).toBe('€&nbsp;0');
  });
});
