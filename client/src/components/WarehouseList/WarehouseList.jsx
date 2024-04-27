import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sortImg from '../../assets/icons/sort-24px.svg';
import searchImg from '../../assets/icons/search-24px.svg';
import deleteImg from '../../assets/icons/delete_outline-24px.svg';
import editImg from '../../assets/icons/edit-24px.svg';
import chevronImg from '../../assets/icons/chevron_right-24px.svg';

import './WarehouseList.scss';

const WarehouseList = ({
  warehouseList,
  handleOnClick,
  handleSearch
}) => {
  const navigate = useNavigate();
  
  const handleAddOnClick = () => {
    navigate('/warehouse/add');
  };

  const handleEditWarehouse = () => {
    console.log('Edit');
  };

  const WarehouseHeader = [
    'Warehouse',
    'Address',
    'Contact Name',
    'Contact Information',
    'Actions',
  ];

  return (
    <>
      <div className="panel">
        <div className="panel__container">
          <div className="panel__title">
            <h1>Warehouses</h1>
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

      <div className="warehouse__list">
        <div className="warehouse__card">
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
                + Add New Warehouse
              </button>
            </div>
          </div>
          <div className="warehouse-labels">
            <div className="warehouse-labels__container">
              {WarehouseHeader.map((columnHeader, index) => (
                <div className="warehouse-labels__column-header" key={columnHeader}>
                  <div className="warehouse-labels__header">{columnHeader}</div>
                  {index !== 4 && (
                    <div className="warehouse-labels__buttons">
                      <div className="warehouse-labels__icons">
                        <img
                          className="warehouse-labels__icon"
                          src={sortImg}
                          alt="sort icon"
                          onClick={() => handleOnClick(columnHeader)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="warehouse-facility">
            {warehouseList.map((warehouse) => (
              <div key={warehouse.id} className="warehouse-facility__row">
                <div className="warehouse-facility__mobile-block-1">
                  <div className="warehouse-facility__column-1">
                    <div className="warehouse-facility__header mobile-view">
                      {WarehouseHeader[0]}
                    </div>
                    <div className="warehouse-facility__warehouse-name">
                      <Link to={`/warehouses/${warehouse.id}`}>
                        <div className="warehouse-facility__warehouse-name-container">
                          {warehouse.warehouse_name}
                          <img
                            src={chevronImg}
                            alt="chevron icon"
                            className="warehouse-facility__warehouse-name-chevron"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="warehouse-facility__header mobile-view">
                      {WarehouseHeader[1]}
                    </div>

                    <div className="warehouse-facility__warehouse-address">
                      {warehouse.address}, {warehouse.city}, {warehouse.country}
                    </div>
                  </div>
                  <div className="warehouse-facility__column-2">
                    <div className="warehouse-facility__header mobile-view">
                      {WarehouseHeader[2]}
                    </div>

                    <div className="warehouse-facility__warehouse-contact-name">
                      {warehouse.contact_name}
                    </div>

                    <div className="warehouse-facility__header mobile-view">
                      {WarehouseHeader[3]}
                    </div>
                    <div className="warehouse-facility__warehouse-contact-info">
                      <div className="warehouse-facility__warehouse-contact-number">
                        {warehouse.contact_phone}
                      </div>
                      <div className="warehouse-facility__warehouse-contact-email">
                        {warehouse.contact_email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="warehouse-facility__mobile-block-2">
                  <div className="warehouse-facility__warehouse-actions">
                    <div className="warehouse-facility__warehouse-actions-delete">
                      <Link to={`/warehouses/delete-warehouse/${warehouse.id}`}>
                        <img src={deleteImg} alt="delete icon" />
                      </Link>
                    </div>
                    <Link to={`/warehouse/${warehouse.id}/edit`}>
                    <div className="warehouse-facility__warehouse-actions-edit">
                      <img src={editImg} alt="edit icon" onClick={() => handleEditWarehouse()} />
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

export default WarehouseList;
