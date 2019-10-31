import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import DiscountBadge from './DiscountBadge';

const renderBadge = (price = 140, basePrice = 200) => {
  return render(<DiscountBadge price={price} basePrice={basePrice} />);
};

test('it renders', () => {
  const { getByTestId } = renderBadge();
  getByTestId('discount-container');
});

test('is shows the discount', () => {
  const { getByTestId } = renderBadge(140, 200);
  const badge = getByTestId('discount-container');
  expect(badge).toHaveTextContent(/^30%$/);
});

describe('rounding discount', () => {
  test('is rounds the discount down', () => {
    const { getByTestId } = renderBadge(60, 90);
    const badge = getByTestId('discount-container');
    expect(badge).toHaveTextContent(/^33%$/);
  });

  test('is rounds the discount up', () => {
    const { getByTestId } = renderBadge(30, 90);
    const badge = getByTestId('discount-container');
    expect(badge).toHaveTextContent(/^67%$/);
  });
});
