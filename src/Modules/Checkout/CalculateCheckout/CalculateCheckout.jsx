import React from 'react';
import { useSelector } from 'react-redux';

function CalculateCheckout() {
  const products = useSelector(state => Object.values(state.products));

  function calculateTotal() {
    const total = products.reduce((acc, product) => {
      return acc + product.amount * product.product.price;
    }, 0);

    return total;
  }

  function calculateShippingCost() {
    let totalWithShipping = calculateTotal();
    if (totalWithShipping < 40) totalWithShipping += 10;

    return totalWithShipping;
  }
  return (
    <div data-testid="calculateCheckoutComp">
      <ul>
        <li>
          <span>Total:</span>
          <span data-testid="total">{calculateTotal()}</span>
        </li>
        <li>
          <span>Shipping cost:</span>
          <span data-testid="shippingCost">10</span>
        </li>
        <li>
          <span>Total with Shipping cost:</span>
          <span data-testid="totalWithShipping">{calculateShippingCost()}</span>
        </li>
        <li>
          <button type="button">proceed to checkout</button>
        </li>
      </ul>
    </div>
  );
}

export default CalculateCheckout;
