import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sortImg from '../../assets/icons/sort-24px.svg';
import searchImg from '../../assets/icons/search-24px.svg';
import deleteImg from '../../assets/icons/delete_outline-24px.svg';
import editImg from '../../assets/icons/edit-24px.svg';
import chevronImg from '../../assets/icons/chevron_right-24px.svg';

import './InventoryList.scss';

const InventoryList = ({
  inventoryList,
  handleOnClick,
  handleSearch,
}) => {
  const navigate = useNavigate();

  const handleAddOnClick = () => {
    navigate('/inventory/add-item');
  };

  const inventoryHeader = ['Inventory Item', 'Category', 'Status', 'Qty', 'Warehouse', 'Actions'];

  return (
    <>
      <div className="panel">
        <div className="panel__container">
          <div className="panel__title">
            <h1>Inventory</h1>
          </div>
          <div className="panel__search tablet-view">
            <input
              type="text"
              className="panel__search-bar"
              id="search-bar"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <img src={searchImg} alt="search" />
          </div>
          <div className="panel__add tablet-view">
            <button className="panel__add-button" onClick={handleAddOnClick}>
              + Add New Item
            </button>
          </div>
        </div>
      </div>

      <div className="inventory__list">
        <div className="inventory__card">
          <div className="search-panel mobile-view">
            <div className="search-panel__search">
              <input
                type="text"
                className="search-panel__search-bar"
                id="search-bar"
                placeholder="Search..."
              />
              <img src={searchImg} alt="search" />
            </div>

            <div className="search-panel__add">
              <button className="search-panel__add-button" onClick={handleAddOnClick}>
                + Add New Item
              </button>
            </div>
          </div>
          <div className="inventory-labels">
            <div className="inventory-labels__container">
              {inventoryHeader.map((column, index) => (
                <div className="inventory-labels__column-header" key={column}>
                  <div className="inventory-labels__header">{column}</div>
                  {index !== 5 && (
                    <div className="inventory-labels__buttons">
                      <div className="inventory-labels__icons">
                        <img
                          className="inventory-labels__icon"
                          src={sortImg}
                          alt="sort icon"
                          onClick={() => handleOnClick(column)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="inventory-product">
            {inventoryList.map((inventoryItem) => (
              <div key={inventoryItem.id} className="inventory-product__row">
                <div className="inventory-product__mobile-block-1">
                  <div className="inventory-product__column-1">
                    <div className="inventory-product__header mobile-view">
                      {inventoryHeader[0]}
                    </div>
                    <div className="inventory-product__inventory-name">
                      <Link to={`/inventory/${inventoryItem.id}`}>
                        <div className="inventory-product__inventory-name-container">
                          {inventoryItem.item_name}
                          <img
                            src={chevronImg}
                            alt="chevron icon"
                            className="inventory-product__inventory-name-chevron"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="inventory-product__header mobile-view">
                      {inventoryHeader[1]}
                    </div>

                    <div className="inventory-product__inventory-category">
                      {inventoryItem.category}
                    </div>
                  </div>
                  <div className="inventory-product__column-2">
                    <div className="inventory-product__header mobile-view">
                      {inventoryHeader[2]}
                    </div>

                    <div className="inventory-product__inventory-status">
                      <div
                        className={`inventory-product__inventory-status-tag ${
                          inventoryItem.quantity !== 0
                            ? 'inventory-product__inventory-status--in-stock'
                            : 'inventory-product__inventory-status--no-stock'
                        }`}>
                        {inventoryItem.status}
                      </div>
                    </div>

                    <div className="inventory-product__header mobile-view">
                      {inventoryHeader[3]}
                    </div>
                    <div className="inventory-product__inventory-quantity-container">
                      <div className="inventory-product__inventory-quantity">
                        {inventoryItem.quantity}
                      </div>
                    </div>

                    <div className="inventory-product__header mobile-view">
                      {inventoryHeader[4]}
                    </div>
                    <div className="inventory-product__inventory-warehouse-name">
                      <div className="inventory-product__inventory-warehouse-column">
                        {inventoryItem.warehouse_name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="inventory-product__mobile-block-2">
                  <div className="inventory-product__inventory-actions">
                    <div className="inventory-product__inventory-actions-delete">
                      <Link to={`/inventory/delete-item/${inventoryItem.id}`}>
                        <img src={deleteImg} alt="delete icon" />
                      </Link>
                    </div>
                    <Link to={`/inventory/edit-item/${inventoryItem.id}`}>
                      <div className="inventory-product__inventory-actions-edit">
                        <img src={editImg} alt="edit icon" />
                      </div>
                    </Link>
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

export default InventoryList;
