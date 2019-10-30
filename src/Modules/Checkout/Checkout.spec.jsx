import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import Checkout from './Checkout';
import { renderWithRedux } from '../../../test/react-testing-helpers';

const renderCheckoutList = (initialState = { products: {} }) => {
  return renderWithRedux(<Checkout />, { initialState });
};

describe('Checkout', () => {
  test('It renders by default', () => {
    const { container, getByPlaceholderText } = renderCheckoutList();

    expect(container).not.toBeEmpty();
    getByPlaceholderText('additional information');
  });

  test('It renders shopping list and calculate checkout', () => {
    const { getByTestId } = renderCheckoutList();

    getByTestId('shoppingListComp');
    getByTestId('calculateCheckoutComp');
  });
});
