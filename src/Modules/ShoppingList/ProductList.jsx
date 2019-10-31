import React, { useState, useEffect } from 'react';
import ProductItem from './Components/ProductItem';
import { getProductsList } from '../../api/productsApi';

const ProductList = () => {
  const [products, setProducts] = useState();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const result = await getProductsList(page);

      setProducts(result);
    }

    fetchProducts();
  }, [page]);

  return (
    <div className="container-fluid" data-testid="productListContainer">
      <h1>Web Shop</h1>
      <div className="row mb-2">
        <div className="col-12">
          <nav className="d-flex justify-content-between" aria-label="Product Page navigation">
            <a className="btn btn-sm btn-outline-primary disabled" href="/products?page=0">
              Previous
            </a>
            <a className="btn btn-sm btn-outline-primary" href="/products?page=2">
              Next
            </a>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="row product-grid">
            {products &&
              products.map(value => {
                return (
                  <div className="col-3">
                    <ProductItem item={value} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
