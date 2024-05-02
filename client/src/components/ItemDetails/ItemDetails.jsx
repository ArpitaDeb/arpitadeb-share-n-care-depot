import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

import BackIcon from '../../assets/icons/arrow_back-24px.svg';
import editImg from '../../assets/icons/edit-24px.svg';

import './itemDetails.scss';

export const ItemDetails = ({inventory}) => {
  const navigate = useNavigate();
  const handleEditInventory = () => {
    navigate(`/inventory/edit-item/${inventory.id}`);
  }
  const handleOnClickReservation = () => {
    navigate(`/inventory/reserve/${inventory.id}`);
  }
  return inventory ? (
    <div className="inventory-item">
      <div className="inventory-item__wrapper">
        <div className='itemForm__panel'>
          <div className='itemForm__header-container'>
        <div className="inventory-item__header">
          <div className="inventory-item__title-group">
            <button className="inventory-item__button-back">
              <Link to={'/inventory'}>
                <img src={BackIcon} alt="back" />
              </Link>
            </button>
            <h1>{inventory.item_name}</h1>
          </div>
        </div>
        </div>
        </div>
        <div className="inventory-item__container">
        <div className="inventory-item__main-group">
          <div className="inventory-item__left-group">
            <div className="inventory-item__description-group">
              <h4 className="inventory-item__description-title">ITEM DESCRIPTION:</h4>
              <p>{inventory.description}</p>
            </div>
            <div className="inventory-item__category-group">
              <h4 className="inventory-item__description-title">CATEGORY:</h4>
              <p>Electronics</p>
            </div>
          </div>
          <div className="inventory-item__right-group">
            <div className="inventory-item__status-quant-group">
              <div className="inventory-item__status-group">
                <h4 className="inventory-item__description-title ">STATUS:</h4>
                <p className='in-stock-inventory'>Available</p>
              </div>
              <div className="inventory-item__quantity-group">
                <h4 className="inventory-item__description-title">QUANTITY:</h4>
                <p>{inventory.quantity}</p>
              </div>
              <div className="">
            <Button
              btnType="button"
              className="btn btn--reserve"
              btnContent="Reserve"
              handleButtonOnClick={handleOnClickReservation}
            />
          </div>
            </div>
              </div>
          </div>
        </div>
      </div>
      </div>
  ) : (
    ''
  );
};
