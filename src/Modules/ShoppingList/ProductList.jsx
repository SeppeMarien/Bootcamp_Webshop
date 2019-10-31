import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductItem from './Components/ProductItem';
import getProductsList from '../../api/productsApi';

const ProductList = () => {
  const [products, setProducts] = useState();
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  // const [page, setPage] = useState(1);

  // if (location.search) page = location.search.query.;

  const search = new URLSearchParams(location.search);
  const page = search.get('page') || 1;

  console.log(page);

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
            <Link
              className={`btn btn-sm btn-outline-primary ${+page === 1 ? 'disabled' : ''}`}
              to={`/products?page=${Number(page) - 1}`}
            >
              Previous
            </Link>
            <Link className="btn btn-sm btn-outline-primary" to={`/products?page=${Number(page) + 1}`}>
              Next
            </Link>
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
