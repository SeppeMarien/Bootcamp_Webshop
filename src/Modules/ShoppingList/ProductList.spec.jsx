import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render as renderRtl, waitForElement } from '@testing-library/react';
import nock from 'nock';

import ProductList from './ProductList';

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
          _limit: 15,
        })
        .reply(200, [product1, product2, product3]);

      const { getAllByTestId } = renderRtl(<ProductList />);
      const productItems = await waitForElement(() => getAllByTestId('product-item'));

      expect(productItems.map(x => x.getAttribute('data-id'))).toEqual(['1', '2', '3']);
    });
  });
});
