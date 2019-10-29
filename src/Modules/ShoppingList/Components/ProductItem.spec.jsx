import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render as renderRtl } from '@testing-library/react';
import ProductItem from './ProductItem';

function createDefaultProduct(id) {
  return {
    id,
    title: `Product ${id}`,
    sku: '1050047509',
    price: 23.99,
  };
}

function render(id, itemProps) {
  const baseItem = createDefaultProduct(id);
  return renderRtl(<ProductItem item={{ ...baseItem, ...itemProps }} />);
}

describe('testing product item component', () => {
  test('it renders by default', () => {
    const { getByRole, getByAltText, getByText, getByTestId } = render(1);
    getByAltText('productImage');
    getByText('Product 1');
    getByText('1050047509');
    getByTestId('price');

    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert', 'alert-danger');
  });

  describe('in or out stock', () => {
    test('it renders with out of stock when stocked is false', () => {
      const { getByRole } = render(2, { stocked: false });

      const alert = getByRole('alert');
      expect(alert).toHaveClass('alert', 'alert-danger');
    });

    test('it renders with in stock when stocked is true', () => {
      const { getByRole } = render(2, { stocked: true });

      const alert = getByRole('alert');
      expect(alert).toHaveClass('alert', 'alert-success');
    });
  });

  describe('With and without description', () => {
    test('it renders with the supplied description', () => {
      const { getByText } = render(3, { desc: 'This is a description.' });

      getByText('This is a description.');
    });

    test('it renders with the default description', () => {
      const { getByText } = render(3);

      getByText(/No description available at the moment/);
    });
  });

  describe('with and without image', () => {
    test('it renders with the supplied image', () => {
      const { getByAltText } = render(2, { image: 'http://placehold.it/400x300' });
      const image = getByAltText('productImage');

      expect(image).toHaveProperty('src', 'http://placehold.it/400x300');
    });

    test('it renders with the default image', () => {
      const { getByAltText } = render(2);
      const image = getByAltText('productImage');

      expect(image).toHaveProperty('src', 'http://placehold.it/350x260');
    });
  });

  describe('with and without base price', () => {
    test("it renders only the price when the price hasn't changed and base price has been supplied", () => {
      const { queryByTestId } = render(1, { basePrice: 23.99 });
      const basePrice = queryByTestId('basePrice');

      expect(basePrice).not.toBeInTheDocument();
    });

    describe('price has changed', () => {
      test('it renders the price and base price when price has been reduced', () => {
        const { getByTestId } = render(1, { basePrice: 500.0 });
        const basePrice = getByTestId('basePrice');

        expect(basePrice).toHaveStyle(`text-decoration: line-through`);
      });

      test('it only renders price when price has been raised', () => {
        const { queryByTestId } = render(1, { basePrice: 5.0 });
        const basePrice = queryByTestId('basePrice');

        expect(basePrice).not.toBeInTheDocument();
      });
    });
  });
});
