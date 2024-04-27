import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import sortImg from '../../assets/icons/sort-24px.svg';
import deleteImg from '../../assets/icons/delete_outline-24px.svg';
import editImg from '../../assets/icons/edit-24px.svg';
import chevronImg from '../../assets/icons/chevron_right-24px.svg';

import './WarehouseInventory.scss';

export const WarehouseInventory = ({ inventoryList }) => {
  const navigate = useNavigate();

  const handleEditInventory = (inventoryId) => {
    navigate(`/inventory/edit-item/${inventoryId}`);
  };

  const inventoryHeader = ['Inventory Item', 'Category', 'Status', 'Qty', 'Actions'];

  return (
    <>
      <div className="warehouse-inventory__list">
        <div className="warehouse-inventory__card">
          <div className="warehouse-inventory-labels">
            <div className="warehouse-inventory-labels__container">
              {inventoryHeader.map((columnHeader, index) => (
                <div className="warehouse-inventory-labels__column-header" key={columnHeader}>
                  <div className="warehouse-inventory-labels__header">{columnHeader}</div>
                  {index !== 5 && (
                    <div className="warehouse-inventory-labels__buttons">
                      <div className="warehouse-inventory-labels__icons">
                        <img
                          className="warehouse-inventory-labels__icon"
                          src={sortImg}
                          alt="sort icon"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="warehouse-inventory-product">
            {inventoryList.map((inventoryItem) => (
              <div key={inventoryItem.id} className="warehouse-inventory-product__row">
                <div className="warehouse-inventory-product__mobile-block-1">
                  <div className="warehouse-inventory-product__column-1">
                    <div className="warehouse-inventory-product__header mobile-view">
                      <h4>{inventoryHeader[0]}</h4>
                    </div>
                    <div className="warehouse-inventory-product__inventory-name">
                      <Link to={`/inventory/${inventoryItem.id}`}>
                        <div className="warehouse-inventory-product__inventory-name-container">
                          {inventoryItem.item_name}
                          <img
                            src={chevronImg}
                            alt="chevron icon"
                            className="warehouse-warehouse-inventory-product__inventory-name-chevron"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="warehouse-inventory-product__header mobile-view">
                      <h4>{inventoryHeader[1]}</h4>
                    </div>

                    <div className="warehouse-inventory-product__inventory-category">
                      {inventoryItem.category}
                    </div>
                  </div>
                  <div className="warehouse-inventory-product__column-2">
                    <div className="warehouse-inventory-product__header mobile-view">
                      <h4>{inventoryHeader[2]}</h4>
                    </div>

                    <div className="warehouse-inventory-product__inventory-status">
                      <div
                        className={`warehouse-inventory-product__inventory-status-tag ${
                          inventoryItem.quantity !== 0
                            ? 'warehouse-inventory-product__inventory-status--in-stock'
                            : 'warehouse-inventory-product__inventory-status--no-stock'
                        }`}>
                        {inventoryItem.status}
                      </div>
                    </div>

                    <div className="warehouse-inventory-product__header mobile-view">
                      <h4>{inventoryHeader[3]}</h4>
                    </div>
                    <div className="warehouse-inventory-product__inventory-quantity-container">
                      <div className="warehouse-inventory-product__inventory-quantity">
                        {inventoryItem.quantity}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="warehouse-inventory-product__mobile-block-2">
                  <div className="warehouse-inventory-product__inventory-actions">
                    <div className="warehouse-inventory-product__inventory-actions-delete">
                      <Link to={`/inventory/delete-item/${inventoryItem.id}`}>
                        <img src={deleteImg} alt="delete icon" />
                      </Link>
                    </div>
                    <div className="warehouse-inventory-product__inventory-actions-edit">
                    <img src={editImg} alt="edit icon" onClick={() => handleEditInventory(inventoryItem.id)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
