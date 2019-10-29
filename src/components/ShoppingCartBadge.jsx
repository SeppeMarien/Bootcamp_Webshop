/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function ShoppingCartBadge() {
  const myProducts = useSelector(state => state.products);

  const getAmountOfProducts = () => {
    return Object.values(myProducts).reduce((total, item) => {
      return total + Number(item.amount);
    }, 0);
  };

  return (
    <NavLink to="/checkout">
      <i className="fa fa-shopping-cart" />({getAmountOfProducts()})
    </NavLink>
  );
}

export default ShoppingCartBadge;
