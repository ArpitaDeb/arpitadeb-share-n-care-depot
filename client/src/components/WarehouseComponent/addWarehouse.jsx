import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { isValidEmail, isValidPhone } from "../../utils/validator";

import arrow from "../../assets/icons/arrow_back-24px.svg";
import ErrorIcon from "../../assets/icons/error-24px.svg";

import "./WarehouseComponent.scss";

const apiURL = process.env.REACT_APP_API_URL || 8080;

export function AddWarehouse() {
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.warehouse_name) {
      isValid = false;
      errors.warehouse_name = "The field warehouse name is required";
    }
    if (!formData.address) {
      isValid = false;
      errors.address = "The field address is required";
    }
    if (!formData.city) {
      isValid = false;
      errors.city = "The field city is required";
    }
    if (!formData.country) {
      isValid = false;
      errors.country = "The field country is required";
    }
    if (!formData.contact_name) {
      isValid = false;
      errors.contact_name = "The field contact name is required";
    }
    if (!formData.contact_position) {
      isValid = false;
      errors.contact_position = "The field position is required";
    } else {
      delete errors.contact_position;
    }
    if (!isValidPhone(formData.contact_phone)) {
      isValid = false;
      errors.contact_phone = "The field with Valid phone number is required";
    }
    if (!isValidEmail(formData.contact_email)) {
      isValid = false;
      errors.contact_email = "The field with valid email address is required";
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post(`${apiURL}/api/warehouses`, formData)
        .then((response) => {
          alert("Warehouse Added Successfully! 🚀");
          navigate("/");
        })
        .catch((error) => console.error("Error:", error));
    }
  };
  const handleClick = () => {
    navigate("/");
  };
  const handleClickCancel = () => {
    navigate("/");
  };
  return (
    <div className="warehouseItem">
      <div className="warehouseItem__panel">
        <div className="warehouseItem__header-container">
          <h1 onClick={handleGoBack} className="warehouseItem__header">
            Add New Warehouse
          </h1>
          <div className="warehouseItem__border"></div>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate className="warehouseItem__form">
        <div className="warehouseItem__content">
          <div className="itemDetails">
            <h2 className="itemDetails__title">Warehouse Details</h2>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="name">
                Warehouse Name
              </label>
              <input
                className={`itemDetails__input ${
                  error.warehouse_name ? "error-input" : ""
                }`}
                name="warehouse_name"
                type="text"
                placeholder="  Warehouse Name"
                value={formData.warehouse_name}
                onChange={formHandler}
              ></input>
              {error.warehouse_name && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.warehouse_name}
                </p>
              )}
            </div>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="address">
                Street Address
              </label>
              <input
                className={`itemDetails__input ${
                  error.address ? "error-input" : ""
                }`}
                name="address"
                type="text"
                placeholder="  Street Address"
                value={formData.address}
                onChange={formHandler}
              ></input>
              {error.address && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.address}
                </p>
              )}
            </div>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="city">
                City
              </label>
              <input
                className={`itemDetails__input ${
                  error.city ? "error-input" : ""
                }`}
                name="city"
                type="text"
                placeholder="  City"
                value={formData.city}
                onChange={formHandler}
              ></input>
              {error.city && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.city}
                </p>
              )}
            </div>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="country">
                Country
              </label>
              <input
                className={`itemDetails__input ${
                  error.country ? "error-input" : ""
                }`}
                name="country"
                type="text"
                placeholder="  Country"
                value={formData.country}
                onChange={formHandler}
              ></input>
              {error.country && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.country}
                </p>
              )}
            </div>
          </div>
          <div className="warehouseItem__border-vertical"></div>
          <div className="itemDetails">
            <h2 className="itemDetails__title">Contact Details</h2>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="name">
                Contact Name
              </label>
              <input
                className={`itemDetails__input ${
                  error.contact_name ? "error-input" : ""
                }`}
                name="contact_name"
                type="text"
                placeholder="  Contact Name"
                value={formData.contact_name}
                onChange={formHandler}
              ></input>
              {error.contact_name && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_name}
                </p>
              )}
            </div>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="position">
                Position
              </label>
              <input
                className={`itemDetails__input ${
                  error.contact_position ? "error-input" : ""
                }`}
                name="contact_position"
                type="text"
                placeholder="  Position"
                value={formData.contact_position}
                onChange={formHandler}
              ></input>
              {error.contact_position && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_position}
                </p>
              )}
            </div>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="number">
                Phone Number
              </label>
              <input
                className={`itemDetails__input ${
                  error.contact_phone ? "error-input" : ""
                }`}
                name="contact_phone"
                type="text"
                placeholder="  Phone Number"
                value={formData.contact_phone}
                onChange={formHandler}
              ></input>
              {error.contact_phone && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_phone}
                </p>
              )}
            </div>
            <div className="itemDetails__unit">
              <label className="itemDetails__label" for="email">
                Email
              </label>
              <input
                className={`itemDetails__input ${
                  error.contact_email ? "error-input" : ""
                }`}
                name="contact_email"
                type="text"
                placeholder="  Email"
                value={formData.contact_email}
                onChange={formHandler}
              ></input>
              {error.contact_email && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_email}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="warehouseItem__button">
          <button
            type="button"
            className="warehouseItem__button-cancel"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
          <button className="warehouseItem__button-add" type="Submit">
            + Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
}
