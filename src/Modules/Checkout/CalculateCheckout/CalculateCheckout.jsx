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
    if (totalWithShipping !== 0 && totalWithShipping < 40) {
      totalWithShipping += 10;
    }

    return totalWithShipping;
  }

  const total = calculateTotal();
  const totalShippingCost = calculateShippingCost();

  return (
    <div data-testid="calculateCheckoutComp" className="col-lg-6">
      <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary</div>
      <div className="p-4">
        <p className="font-italic mb-4">
          Shipping and additional costs are calculated based on values you have entered.
        </p>
        <ul className="list-unstyled mb-4">
          <li className="d-flex justify-content-between py-3 border-bottom">
            <strong className="text-muted">Order Subtotal </strong>
            <strong>
              {' '}
              <span data-testid="total" className="money">
                €&nbsp;{total}
              </span>
            </strong>
          </li>
          <li className="d-flex justify-content-between py-3 border-bottom">
            <strong className="text-muted">Shipping and handling (free above € 40)</strong>
            <strong>
              <span className="money money--old">
                <p data-testid="shippingCost">€&nbsp;{total !== 0 && total < 40 ? 10 : 0}</p>
              </span>
            </strong>
          </li>
          <li className="d-flex justify-content-between py-3 border-bottom">
            <strong className="text-muted">Total</strong>
            <h5 className="font-weight-bold">
              <span data-testid="totalWithShipping" className="money">
                €&nbsp;{totalShippingCost}
              </span>
            </h5>
          </li>
        </ul>
        <button className="btn btn-dark rounded-pill py-2 btn-block" type="button">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CalculateCheckout;
