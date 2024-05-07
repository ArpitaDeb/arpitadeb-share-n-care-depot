import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronImg from "../../assets/icons/chevron_right-24px.svg";
import Pagination from "../Pagination/Pagination";
import DropdownSelect from "../../components/Dropdown/Dropdown";
import "./InventoryList.scss";

const InventoryList = ({
  inventoryList,
  handleOnClick,
  handleSearch,
  setIsAdminLoggedIn,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const handleAddOnClick = () => {
    navigate("/inventory/upload");
  };

  const handleCategoryFilter = (selectedCategory) => {
    if (selectedCategory === "Please select a category") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(selectedCategory);
    }
  };

  const filteredList = selectedCategory
    ? inventoryList.filter((item) => item.category === selectedCategory)
    : inventoryList;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const filteredList = selectedCategory
      ? inventoryList.filter((item) => item.category === selectedCategory)
      : inventoryList;

    setFilteredItems(filteredList);
    setCurrentPage(1);
  }, [selectedCategory, inventoryList]);

  const inventoryHeader = [
    "Inventory Item",
    "Category",
    "Image",
    "Actions",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="inventory__indexSort">
          <p>
            <span>Showing 1 - 8</span> out of All Products
          </p>
         <div className="inventory__sort">
        <DropdownSelect
          labelName="Filter By Category"
          items={[
            "Please select a category",
            "Electronics",
            "Outdoor Gear",
            "Hobbies",
            "Apparel",
            "Accessories",
            "BBQ tools",
            "Cleaning supplies",
            "Grilling baskets or trays",
            "Helmet",
            "Roller skates",
            "Camp stove",
            "Portable grill",
            "Miscellaneous",
          ]}
          defaultValue="Please select a category"
          fieldName="category"
          onChange={handleCategoryFilter}
          value={selectedCategory} 
        />
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
      <Pagination
        pageCount={Math.ceil(filteredList.length / itemsPerPage)}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
      </div>
    </>
  );
};

export default InventoryList;
