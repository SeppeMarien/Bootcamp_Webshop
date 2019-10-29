import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../../store/Actions/ProductActions';

function ShoppingCartList() {
  const products = useSelector(state => Object.values(state.products));
  const dispatch = useDispatch();

  function removeItem(productId) {
    dispatch(removeProduct(productId));
  }

  return (
    <table data-testid="shoppingListComp">
      <thead>
        <tr>
          <th scope="col">
            <div>Product</div>
          </th>
          <th scope="col">
            <div>Sku</div>
          </th>
          <th scope="col">
            <div>Price</div>
          </th>
          <th scope="col">
            <div>Quantity</div>
          </th>
          <th scope="col">
            <div>Remove</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.product.id}>
            <th>
              <img src={product.product.image} width="30" height="30" alt={`${product.product.name}`} />
            </th>
            <th>{product.product.name}</th>
            <th>{product.product.sku}</th>
            <th>{product.product.price}</th>
            <th>{product.amount}</th>
            <th>
              <button
                type="button"
                data-testid={`button${product.product.id}`}
                onClick={() => removeItem(product.product.id)}
              >
                <i className="far fa-trash-alt" />
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ShoppingCartList;
