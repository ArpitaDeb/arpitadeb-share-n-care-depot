import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import BackIcon from "../../assets/icons/arrow_back-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import "./itemDetails.scss";

export const ItemDetails = ({ inventory }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("authToken");

  const handleChangeQuantity = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleEditInventory = () => {
    navigate(`/inventory/edit-item/${inventory.id}`);
  };

  const handleOnClickReservation = () => {
    navigate(`/inventory/reserve/${inventory.id}?quantity=${quantity}`);
  };

  return inventory ? (
    <div className="inventory-item">
      <div className="inventory-item__wrapper">
        <div className="itemForm__panel">
          <div className="itemForm__header-container">
            <div className="inventory-item__header">
              <div className="inventory-item__title-group">
                <button className="inventory-item__button-back">
                  <Link to={"/inventory"}>
                    <img src={BackIcon} alt="back" />
                  </Link>
                </button>
                <h1>{inventory.item_name}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="inventory-item__container">
          <div className="inventory-item__main-group">
            <div className="inventory-item__left-group">
              <div>
                <h2 className="inventory-item__description-title">
                  Product Description:
                </h2>
                <h3 className="inventory-item__description-group">{inventory.description}</h3>
              </div>
              <div>
                <label className="inventory-item__qua" htmlFor="qty">
                  Quantity
                </label>
                <input
                  className={"inventory-item__input"}
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="enter quantity"
                  value="1"
                />
              </div>
            </div>
            <div className="inventory-item__right-group">
              <div className="inventory-item__status-group">
                <div className="inventory-item__reserve">
                  {token ? (
                    <Button
                      btnType="button"
                      className="btn btn--reserve"
                      btnContent="Reserve"
                      handleButtonOnClick={handleOnClickReservation}
                    />
                  ) : (
                    <h3 className="inventory-item__description-group">
                      Would you like to try? Please{" "}
                      <Link className="inventory-item__description-title--login" to="/login">Login</Link> to your ShareNCare account
                      to reserve this item.
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
