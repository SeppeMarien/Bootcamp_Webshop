import React from 'react';
import { useDispatch } from 'react-redux';
import { shape, number, string, bool } from 'prop-types';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert/Alert';
import DiscountBadge from './DiscountBadge';
import { addProduct } from '../../../store/Actions/ProductActions';

const ProductItem = ({ item }) => {
  const { id, title, desc, image, sku, stocked, price, basePrice } = item;
  const dispatch = useDispatch();

  function onBtnClick() {
    const action = addProduct(item);
    dispatch(action);
  }

  return (
    <div className="card" style={{ width: '18rem' }} data-testid="product-item" data-id={id}>
      <img src={!image ? 'http://placehold.it/350x260' : image} className="card-img-top" alt="productImage" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {!desc ? 'No description available at the moment, please excuse us for the inconvenience.' : desc}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <b>SKU: </b> {sku}
        </li>
        <li className="list-group-item">
          <span data-testid="price">{price}</span>
          {basePrice && basePrice > price && (
            <span style={{ textDecoration: 'line-through' }} data-testid="basePrice">
              {basePrice}
            </span>
          )}
        </li>
        <li className="list-group-item">
          <Alert variant={stocked ? 'success' : 'danger'}>{stocked ? 'in Stock' : 'out of stock'}</Alert>
        </li>
      </ul>
      <div className="card-body">
        <Button onClick={onBtnClick} className="secondary">
          Add to cart
        </Button>
      </div>
      {basePrice && basePrice > price && <DiscountBadge price={price} basePrice={basePrice} />}
    </div>
  );
};
ProductItem.propTypes = {
  item: shape({
    id: number.isRequired,
    title: string.isRequired,
    desc: string,
    image: string,
    sku: string.isRequired,
    stocked: bool,
    price: number.isRequired,
    basePrice: number,
  }).isRequired,
};

export default ProductItem;
