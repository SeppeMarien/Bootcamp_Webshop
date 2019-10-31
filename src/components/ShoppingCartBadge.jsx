/* eslint-disable no-console */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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
      <FontAwesomeIcon role="img" icon={faShoppingCart} />({getAmountOfProducts()})
    </NavLink>
  );
}

export default ShoppingCartBadge;
