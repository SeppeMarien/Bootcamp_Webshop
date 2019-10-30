import React from 'react';

import CalculateCheckout from './CalculateCheckout/CalculateCheckout';
import ShoppingCartList from './ShoppingCartList/ShoppingCartList';

function Checkout() {
  return (
    <>
      <h1>Checkout</h1>
      <ShoppingCartList />
      <CalculateCheckout />
      <input type="text" placeholder="requestTextbox" />
    </>
  );
}

export default Checkout;
