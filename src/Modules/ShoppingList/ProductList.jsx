import React, { useState, useEffect } from 'react';
import ProductItem from './Components/ProductItem';
import { getProductsList } from '../../api/productsApi';

const ProductList = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const result = await getProductsList();

      setProducts(result);
    }

    fetchProducts();
  }, []);

  return (
    <div className="container" data-testid="productListContainer" style={{ marginTop: '50px' }}>
      <div className="row">
        <ul style={{ display: 'flex' }}>
          {products &&
            products.map(value => {
              return (
                <li style={{ listStyle: 'none', marginRight: '20px' }} key={`${value.id}`}>
                  <ProductItem item={value} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
