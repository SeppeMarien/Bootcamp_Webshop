import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { waitForElement, fireEvent } from '@testing-library/react';
import nock from 'nock';

import ProductList from './ProductList';
import { renderWithRouterAndRedux } from '../../../test/react-testing-helpers';

describe('product list component', () => {
  function createProduct(id) {
    return {
      id,
      title: `Product ${id}`,
      sku: '1050047509',
      price: 23.99,
      basePrice: 500.0,
    };
  }

  describe('API call', () => {
    function fakeApi() {
      return nock('http://localhost:3000');
    }

    test('it calls the API ', async () => {
      const product1 = createProduct(1);
      const product2 = createProduct(2);
      const product3 = createProduct(3);

      fakeApi()
        .get('/products')
        .query({
          _page: 1,
          _limit: 12,
          _sort: 'title',
        })
        .reply(200, [product1, product2, product3]);

      const { getAllByTestId } = renderWithRouterAndRedux(<ProductList />);
      const productItems = await waitForElement(() => getAllByTestId('product-item'));

      expect(productItems.map(x => x.getAttribute('data-id'))).toEqual(['1', '2', '3']);
    });

    test('it calls the next page when button pressed', async () => {
      const product2 = createProduct(2);
      const product3 = createProduct(3);

      fakeApi()
        .get('/products')
        .query({
          _page: 1,
          _limit: 12,
          _sort: 'title',
        })
        .reply(200, []);

      const { getByText, getAllByTestId } = renderWithRouterAndRedux(<ProductList />);
      const nextButton = getByText('Next');

      fireEvent.click(nextButton);

      fakeApi()
        .get('/products')
        .query({
          _page: 2,
          _limit: 12,
          _sort: 'title',
        })
        .reply(200, [product2, product3]);

      const productItems = await waitForElement(() => getAllByTestId('product-item'));

      console.log(productItems);

      expect(productItems.map(x => x.getAttribute('data-id'))).toEqual(['2', '3']);
    });

    // test('it ')
  });
});
