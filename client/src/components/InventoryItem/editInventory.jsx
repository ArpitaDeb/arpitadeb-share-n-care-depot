import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { updateInventoryItem, getOneInventory } from '../../api/inventoryApi';
import { fetchWarehouses } from '../../api/warehouseApi';

import './inventoryItem.scss';

const IN_STOCK = 'In Stock';
const OUT_OF_STOCK = 'Out of Stock';

export function EditInventory() {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [inventoryItem, setInventoryItem] = useState(null);
  const [status, setStatus] = useState(IN_STOCK);
  const [itemNameError, setItemNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [warehouseError, setWarehouseError] = useState(false);
  const { inventoryId } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchWarehouses().then((warehouses) => setWarehouses(warehouses));
    getOneInventory(inventoryId).then((item) => {
      setInventoryItem(item);
      setStatus(item.status);
    });
  }, [inventoryId]);

  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let isError = false;

    const form = event.target;
    const item_name = form.item_name.value;
    const description = form.description.value;
    const category = form.category.value;
    const status = form.status.value;
    const quantity = form.quantity ? Number(form.quantity.value) : 0;
    const warehouse_id = Number(form.warehouse.value);

    //validation
    if (!item_name) {
      isError = true;
      setItemNameError(true);
    } else {
      setItemNameError(false);
    }

    if (!description) {
      isError = true;
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if (!category) {
      isError = true;
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    if (!Number.isInteger(quantity) || (status === IN_STOCK && quantity <= 0)) {
      isError = true;
      setQuantityError(true);
    } else {
      setQuantityError(false);
    }

    if (!Number.isInteger(warehouse_id) || warehouse_id <= 0) {
      isError = true;
      setWarehouseError(true);
    } else {
      setWarehouseError(false);
    }

    if (isError) {
      return;
    }

    try {
      const newInventoryItem = await updateInventoryItem(
        inventoryId,
        item_name,
        description,
        category,
        status,
        Number(quantity),
        warehouse_id,
      );

      form.reset();
      handleGoBack();
    } catch (err) {
      console.error('Error creating inventory item', err);
    }
  };
  return (
    <div className="itemForm">
      <div className="itemForm__panel">
        <div className="itemForm__header-container">
          <h1 onClick={handleGoBack} className="itemForm__header">
            Edit Inventory Item
          </h1>
          <div className="itemForm__border"></div>
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="itemForm__form">
        <div className="itemForm__content">
          <div className="details">
            <h2 className="details__title">Item Details</h2>
            <div className="details__name">
              <label className="details__label" for="item_name">
                Item Name
              </label>
              <input
                className="details__input"
                name="item_name"
                type="text"
                placeholder="Item Name"
                defaultValue={inventoryItem ? inventoryItem.item_name : ''}></input>
              {itemNameError && <div className="itemForm__error">Item name is required</div>}
            </div>
            <div className="details__container">
              <label className="details__label" for="description">
                Description
              </label>
              <textarea
                className="details__textarea"
                name="description"
                type="text"
                placeholder="Please enter a brief item description..."
                defaultValue={inventoryItem ? inventoryItem.description : ''}></textarea>
              {descriptionError && <div className="itemForm__error">Description is required</div>}
            </div>
            <div className="details__container">
              <label className="details__label" for="category">
                Category
              </label>
              <select
                className="details__dropdown"
                name="category"
                type="text"
                placeholder="Warehouse Name">
                <option type="text" value="">
                  Please Select
                </option>
                <option type="text" value="Electronics">
                  Electronics
                </option>
                <option type="text" value="Gear">
                  Gear
                </option>
                <option type="text" value="Apparel">
                  Apparel
                </option>
                <option type="text" value="Accessories">
                  Accessories
                </option>
                <option type="text" value="Health">
                  Health
                </option>
              </select>
              {categoryError && <div className="itemForm__error">Category is required</div>}
            </div>
          </div>
          <div className="itemForm__border-vertical"></div>
          <div className="avail">
            <h2 className="avail__title">Item Availability</h2>
            <div className="avail__container">
              <h3 className="avail__label">Status</h3>
              <div className="avail__status">
                <div className="avail__status-container">
                  <input
                    className="avail__input-stock"
                    name="status"
                    type="radio"
                    value={IN_STOCK}
                    checked={status === IN_STOCK}
                    onChange={handleStatusChange}
                  />
                  <label className="avail__label-stock" htmlFor="in_stock">
                    In Stock
                  </label>
                  <br />
                </div>
                <div className="avail__status-container">
                  <input
                    className="avail__input-stock"
                    name="status"
                    type="radio"
                    value={OUT_OF_STOCK}
                    checked={status === OUT_OF_STOCK}
                    onChange={handleStatusChange}
                  />
                  <label className="avail__label-stock" htmlFor="out_of_stock">
                    {OUT_OF_STOCK}
                  </label>
                  <br />
                </div>
              </div>
            </div>
            {status === IN_STOCK && (
              <div className="avail__container-quantity">
                <label className="avail__label-quantity" for="status">
                  Quantity
                </label>
                <br></br>
                <input
                  className="avail__input-quantity"
                  name="quantity"
                  type="number"
                  placeholder="0"
                  defaultValue={inventoryItem ? inventoryItem.quantity : ''}></input>
                {quantityError && <div className="itemForm__error">Quantity is required</div>}
              </div>
            )}
            <div className="avail__container">
              <label for="warehouse">Warehouse</label>
              {warehouses.length > 0 && (
                <select
                  className="avail__dropdown"
                  value={selectedWarehouse}
                  onChange={handleWarehouseChange}
                  name="warehouse"
                  type="text"
                  placeholder="Warehouse Name">
                  <option type="text" value="">
                    Please Select
                  </option>
                  {warehouses.map((warehouse) => (
                    <option type="text" key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouse_name}
                    </option>
                  ))}
                </select>
              )}
              {warehouseError && <div className="itemForm__error">Warehouse is required</div>}
            </div>
          </div>
        </div>
        <div className="itemForm__btn">
          <Link to="/inventory" className="itemForm__btn-link">
            Cancel
          </Link>
          <button className="itemForm__btn-add" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
