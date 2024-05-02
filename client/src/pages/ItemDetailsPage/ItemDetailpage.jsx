import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemDetails } from '../../components/ItemDetails/ItemDetails';

const apiURL = process.env.REACT_APP_API_URL;

export const ItemDetailPage = () => {
  const { inventoryId } = useParams();
  const [inventory, setInventory] = useState();
  
  useEffect(() => {
    const fetchOneInventory = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/inventories/${inventoryId}`);
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching Inventory lists:', error);
      }
    };
    fetchOneInventory();
  }, [inventoryId]);

  return <ItemDetails inventory={inventory} />;
};
