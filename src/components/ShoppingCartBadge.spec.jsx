import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouterAndProductsRedux } from '../../test/react-testing-helpers';

import ShoppingCartBadge from './ShoppingCartBadge';

// jest.mock('./modules/checkout/Checkout', () => () => <div data-testid="checkout-module" />);

describe('Shopping cart item', () => {
  const initialProducts = () => {
    return {
      1: { product: { id: 1, name: 'fanta' }, amount: 1 },
      3: { product: { id: 3, name: 'cola' }, amount: 2 },
    };
  };

  function customRender() {
    return renderWithRouterAndProductsRedux(<ShoppingCartBadge />, {
      initialState: {
        products: initialProducts(),
      },
    });
  }

  test('link works', () => {
    const { getByRole, history } = customRender();
    const link = getByRole('link');
    fireEvent.click(link);
    expect(history.location.pathname).toEqual('/checkout');
  });
  test('it renders an icon', () => {
    const { container } = customRender();
    const icon = container.querySelector('.fa-shopping-cart');
    expect(icon).toBeInTheDocument();
  });
  test('it shows the amount of prodducts in the shopping cart', () => {
    const { getByText } = customRender();
    expect(getByText('(3)')).toBeInTheDocument();
  });
});
