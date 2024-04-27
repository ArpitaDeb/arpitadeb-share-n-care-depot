import React, { useState, useEffect } from "react";
import axios from "axios";

import WarehouseList from "../../components/WarehouseList/WarehouseList";

import "./Home.scss";

const apiURL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [warehouseList, setWarehouseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("warehouse_name");
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleOnClick = (attr) => {
    const sortByMap = {
      "Warehouse": "warehouse_name",
      "Address": "address",
      "Contact Name": "contact_name",
      "Contact Information": "contact_email"
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
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/api/warehouses?sort_by=${sortBy}&order_by=${orderBy}&s=${searchTerm}`
        );
        setWarehouseList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Warehouse lists:", error);
      }
    };
    if (searchTerm) {
      const delay = 300;
      const debounceTimeout = setTimeout(fetchWarehouses, delay);
      return () => clearTimeout(debounceTimeout);
    } else {
      fetchWarehouses();
    }
  }, [sortBy, orderBy, searchTerm]);

  return (
    <>
      {!isLoading ? (
        <WarehouseList
          handleOnClick={handleOnClick}
          warehouseList={warehouseList}
          handleSearch={handleSearch}
        />
      ) : (
        <div className="isLoading">Loading...</div>
      )}
    </>
  );
};

export default Home;
