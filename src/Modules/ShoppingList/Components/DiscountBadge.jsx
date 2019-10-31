import React from 'react';
import { number } from 'prop-types';

function DiscountBadge({ price, basePrice }) {
  const getDiscount = () => {
    return Math.round(100 - (100 * price) / basePrice);
  };
  return <span className="product-discount-label" data-testid="discount-container">{`${getDiscount()}%`}</span>;
}

DiscountBadge.propTypes = {
  price: number.isRequired,
  basePrice: number.isRequired,
};

export default DiscountBadge;
