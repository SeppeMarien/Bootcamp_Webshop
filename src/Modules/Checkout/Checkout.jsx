import React from 'react';

import CalculateCheckout from './CalculateCheckout/CalculateCheckout';
import ShoppingCartList from './ShoppingCartList/ShoppingCartList';

function Checkout() {
  return (
    <>
      <div className="container-fluid">
        <h2>Basket</h2>
        <ShoppingCartList />
        <div className="row py-5 p-4 bg-white rounded shadow-sm">
          <div className="col-lg-6">
            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
              Instructions for seller
            </div>
            <div className="p-4">
              <p className="font-italic mb-4">
                If you have some information for the seller you can leave them in the box below
              </p>
              <textarea name="" cols="30" rows="6" className="form-control" placeholder="additional information" />
            </div>
          </div>
          <CalculateCheckout />
        </div>
      </div>
    </>
  );
}

export default Checkout;
