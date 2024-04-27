import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { WarehouseDetails } from '../../components/WarehouseDetails/WarehouseDetails';
import { WarehouseInventory } from '../../components/WarehouseInventory/WarehouseInventory';

import './WarehousePage.scss';

const apiURL = process.env.REACT_APP_API_URL;

export const WarehousePage = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { warehouseId } = useParams();

  //get warehouse details
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/warehouses/${warehouseId}`);
        setWarehouse(response.data);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
      }
    };
    fetchWarehouses();
  }, [warehouseId]);

  //get inventory list
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/warehouses/${warehouseId}/inventories`);
        setInventoryList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Inventory lists:', error);
      }
    };
    fetchInventories();
  }, [warehouseId]);

  return (
    <div className="warehouse-page">
      <WarehouseDetails warehouse={warehouse} />
      <WarehouseInventory inventoryList={inventoryList} />
    </div>
  );
};
