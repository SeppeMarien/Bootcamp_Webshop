import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeProduct } from '../../../store/Actions/ProductActions';

function ShoppingCartList() {
  const products = useSelector(state => Object.values(state.products));
  const dispatch = useDispatch();

  function removeItem(productId) {
    dispatch(removeProduct(productId));
  }

  return (
    <div className="row">
      <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
        <table data-testid="shoppingListComp" className="table">
          <thead>
            <tr>
              <th scope="col" className="border-0 bg-light">
                <div className="p-2 px-3 text-uppercase">Product</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Price</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Quantity</div>
              </th>
              <th scope="col" className="border-0 bg-light">
                <div className="py-2 text-uppercase">Remove</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.product.id}>
                <th scope="row" className="border-0">
                  <div className="p-2">
                    <img
                      src={product.product.image}
                      width="70"
                      className="img-fluid rounded shadow-sm"
                      alt={`${product.product.name}`}
                    />
                    <div className="ml-3 d-inline-block align-middle">
                      <h5 className="mb-0">{product.product.name}</h5>
                      <span className="text-muted font-weight-normal font-italic d-block">{product.product.sku}</span>
                    </div>
                  </div>
                </th>
                <td className="border-0 align-middle">
                  <strong>
                    <span className="money">€&nbsp;{product.product.price}</span>
                  </strong>
                </td>
                <td className="border-0 align-middle">
                  <strong>{product.amount}</strong>
                </td>
                <td className="border-0 align-middle">
                  <button
                    type="button"
                    data-testid={`button${product.product.id}`}
                    onClick={() => removeItem(product.product.id)}
                    className="btn btn-link btn-sm p-0 text-dark"
                    aria-label="Remove"
                    style={{ verticalAlign: 'top' }}
                  >
                    <FontAwesomeIcon role="img" icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingCartList;
