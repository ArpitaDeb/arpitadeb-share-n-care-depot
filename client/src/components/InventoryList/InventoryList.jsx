import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sortImg from "../../assets/icons/sort-24px.svg";
import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronImg from "../../assets/icons/chevron_right-24px.svg";
import Pagination from "../Pagination/Pagination";
import "./InventoryList.scss";

const InventoryList = ({
  inventoryList,
  handleOnClick,
  handleSearch,
  setIsAdminLoggedIn,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  console.log("in",inventoryList)
  const handleAddOnClick = () => {
    navigate("/inventory/upload");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const inventoryHeader = [
    "Inventory Item",
    "Category",
    "Status",
    "Qty",
    "Image",
    "Actions",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="panel">
        <div className="panel__container">
          <div className="panel__title">
            <h1>Products Collection</h1>
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
          </div>
          <div className="inventory-product">
            {currentItems.map((inventoryItem) => (
                <div key={inventoryItem.id} className="inventory-product__card">
                  <div className="inventory-product__imgbox">
                    <img
                      className="inventory-product__invimg"
                      src={inventoryItem.image_url}
                      alt="product"
                    />
                  </div>
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
            ))}
          </div>
        </div>
      </div>
      <Pagination
        pageCount={Math.ceil(inventoryList.length / itemsPerPage)}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default InventoryList;

