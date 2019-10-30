import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import DiscountBadge from './DiscountBadge';

const renderBadge = () => {
  const price = 140;
  const basePrice = 200;
  return render(<DiscountBadge price={price} basePrice={basePrice} />);
};

test('it renders', () => {
  const { getByTestId } = renderBadge();
  getByTestId('container');
});

test('is shows the discount', () => {
  const { getByText } = renderBadge();
  getByText('30%');
});
