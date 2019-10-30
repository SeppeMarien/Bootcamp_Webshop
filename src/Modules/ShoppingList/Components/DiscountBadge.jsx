import React from 'react';
import { number } from 'prop-types';

function DiscountBadge({ price, basePrice }) {
  const getDiscount = () => {
    return 100 - (100 * price) / basePrice;
  };
  return <div className="product-discount-label" data-testid="container">{`${getDiscount()}%`}</div>;
}

DiscountBadge.propTypes = {
  price: number.isRequired,
  basePrice: number.isRequired,
};

export default DiscountBadge;
