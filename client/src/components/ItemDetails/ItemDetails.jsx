import React from 'react';
import { Link } from 'react-router-dom';

import BackIcon from '../../assets/icons/arrow_back-24px.svg';

import './itemDetails.scss';

export const ItemDetails = ({inventory, warehouse}) => {

  return inventory ? (
    <div className="inventory-item">
      <div className="inventory-item__wrapper">
        <div className='itemForm__panel'>
          <div className='itemForm__header-container'>
        <div className="inventory-item__header">
          <div className="inventory-item__title-group">
            <button className="inventory-item__button-back">
              <Link to={'/'}>
                <img src={BackIcon} alt="back" />
              </Link>
            </button>

            <h1>{inventory.item_name}</h1>
          </div>
          <button className="inventory-item__button-edit-mobile">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                fill="#ffffff"
              />
            </svg>
          </button>
          <button className="inventory-item__button-edit-tablet">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                fill="#ffffff"
              />
            </svg>
            <Link to={`/inventory/edit-item/${inventory.id}`}><p>Edit</p></Link>
          </button>
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
                <p className={`${inventory?.quantity !==0 ? 'in-stock-inventory' : 'no-stock-inventory'}`}>{inventory.status}</p>
              </div>
              <div className="inventory-item__quantity-group">
                <h4 className="inventory-item__description-title">QUANTITY:</h4>
                <p>{inventory.quantity}</p>
              </div>
            </div>
            {warehouse ? (
              <div className="inventory-item__warehouse-group">
                <h4 className="inventory-item__description-title">WAREHOUSE:</h4>
                <p>{warehouse.warehouse_name}</p>
              </div>) : ''
              }
              </div>
          </div>
        </div>
      </div>
      </div>
  ) : (
    ''
  );
};
