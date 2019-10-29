/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ShoppingCartBadge() {
  const myProducts = useSelector(state => state.products);
  console.log(myProducts);
  // const getAmountOfProducts = () => {
  //   Object.values(myProducts).reduce((acc, item) => {
  //     return acc+item.
  //   });
  // };

  return (
    <Link to="/checkout">
      <i className="fa fa-shopping-cart" />
    </Link>
  );
}

export default ShoppingCartBadge;
