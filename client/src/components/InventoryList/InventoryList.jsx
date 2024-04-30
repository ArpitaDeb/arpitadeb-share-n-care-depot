import React from "react";
import { Link, useNavigate } from "react-router-dom";
import sortImg from "../../assets/icons/sort-24px.svg";
import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronImg from "../../assets/icons/chevron_right-24px.svg";

import "./InventoryList.scss";

const InventoryList = ({ inventoryList, handleOnClick, handleSearch }) => {
  const navigate = useNavigate();

  const handleAddOnClick = () => {
    navigate("/inventory/add-item");
  };

  const inventoryHeader = [
    "Inventory Item",
    "Category",
    "Status",
    "Qty",
    "Image",
    "Actions",
  ];

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
              <button
                className="search-panel__add-button"
                onClick={handleAddOnClick}
              >
                + Add New Item
              </button>
            </div>
          </div>
          {/* <div className="inventory-labels">
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
          </div> */}

          <div className="inventory-product">
            {inventoryList.map((inventoryItem) => (
              <div
                key={inventoryItem.id}
                className="inventory-product__row"
              >
                <div className="inventory-product__imgbox"><img className="inventory-product__invimg" src={inventoryItem.image_url} alt="product" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryList;
