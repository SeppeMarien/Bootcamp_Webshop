import React from 'react';
import { useSelector } from 'react-redux';

function CalculateCheckout() {
  const products = useSelector(state => Object.values(state.products));

  function calculateTotal() {
    const temp = products.reduce((acc, product) => {
      return acc + product.amount * (product.product.price * 100);
    }, 0);

    return temp / 100;
  }
  function calculateShippingCost() {
    let totalWithShipping = calculateTotal();
    if (totalWithShipping < 40) {
      totalWithShipping += 10;
    }

    return totalWithShipping;
  }

  const total = calculateTotal();
  const totalShippingCost = calculateShippingCost();

  return (
    <div data-testid="calculateCheckoutComp">
      <ul>
        <li>
          <span>Total:</span>
          <span data-testid="total">{total}</span>
        </li>
        <li>
          <span>Shipping cost:</span>
          <span data-testid="shippingCost">{total < 40 ? 10 : 0}</span>
        </li>
        <li>
          <span>Total with Shipping cost:</span>
          <span data-testid="totalWithShipping">{totalShippingCost}</span>
        </li>
        <li>
          <button type="button">proceed to checkout</button>
        </li>
      </ul>
    </div>
  );
}

export default CalculateCheckout;
