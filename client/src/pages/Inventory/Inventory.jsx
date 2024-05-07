import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InventoryList from '../../components/InventoryList/InventoryList';

import './Inventory.scss';

const apiURL = process.env.REACT_APP_API_URL;

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("item_name");
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnClick = (attr) => {
    const sortByMap = {
      "Inventory Item": "item_name",
      "Category": "category" 
    };
  
    const newSortBy = sortByMap[attr];
    if (!newSortBy) {
      console.error("Invalid attribute:", attr);
      return;
    }
   
    setSortBy(newSortBy);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };
  
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/inventories?sort_by=${sortBy}&order_by=${orderBy}&s=${searchTerm}`
        );
        setInventoryList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Inventory lists:', error);
      }
    };
    if (searchTerm) {
      const delay = 300;
      const debounceTimeout = setTimeout(fetchInventories, delay);
      return () => clearTimeout(debounceTimeout);
    } else {
      fetchInventories();
    } 
  }, [sortBy, orderBy, searchTerm]);

  return (
    <>
      {!isLoading ? (
        <InventoryList
          inventoryList={inventoryList}
          handleOnClick={handleOnClick}
          handleSearch={handleSearch}
        />
      ) : (
        <div className="isLoading">Loading...</div>
      )}
    </>
  );
};

export default Inventory;
