import React, { useState } from "react";
import "./UploadPage.scss";
import Button from "../../components/Button/Button";
import uploadPreview from "../../assets/images/Upload-preview.jpeg";
import DropdownSelect from "../../components/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
export const UploadPage = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectFile, setSelectFile] = useState(null);
  const [preview, setPreview] = useState(uploadPreview);

  const handleChangeItemName = (event) => {
    setItemName(event.target.value);
  };
  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const isValid = (value, minLength) => value && value.length > minLength;

  const isItemNameValid = () => isValid(itemName, 3);
  const isDescriptionValid = () => isValid(description, 5);
  const isFileValid = () => {
    if (selectFile) {
      return true;
    }
    return false;
  };
  const isFormValid = () => {
    if (!isItemNameValid() && !isDescriptionValid() && !isFileValid()) {
      alert("Please enter valid item name, description and image file.");
      return false;
    } else if (!isItemNameValid()) {
      alert("Please enter a valid item name of minimum 3 characters.");
      return false;
    } else if (!isDescriptionValid()) {
      alert("Please enter a valid description of minimum 5 characters.");
      return false;
    } else if (!isFileValid()) {
      alert("Please make sure to insert the image file on the input box!");
      return false;
    }
    return true;
  };

  const handleOnClick = () => {
    navigate("/");
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const formData = new FormData();
        formData.append("image", selectFile);
        formData.append("item_name", itemName);
        formData.append("description", description);
        formData.append("category", category);

        await axios.post(`${apiURL}/apis/inventories`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("item Successfully Uploaded!");
        navigate("/");
      } catch (error) {
        console.error("Error uploading item:", error);
      }
    }
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedImage = e.target.files[0];
      setSelectFile(uploadedImage);
      let imgReader = new FileReader();
      imgReader.onload = () => {
        setPreview(imgReader.result);
      };
      imgReader.readAsDataURL(uploadedImage);
    }
  };
  return (
    <div className="upload">
      <form onSubmit={handlePublish} className="upload__form">
        <div className="upload__container">
          <h1 className="upload__heading">Add New Inventory Item</h1>
          <div className="upload__big-wrap">
            <div className="upload__thumbnail-info">
              <p className="upload__text">Inventory thumbnail</p>
              <img
                className="upload__thumbnail"
                src={preview}
                alt="uploadPreview"
              />
              <input
                className="upload__image"
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>
            <div className="upload__wrapper">
              <label className="upload__text" htmlFor="item_name">
                Item Name
              </label>
              <input
                className={
                  isItemNameValid()
                    ? "input upload__name-input"
                    : "input upload__name-input upload__name-input--error"
                }
                type="text"
                name="item_name"
                id="item_name"
                placeholder="Add an item name"
                onChange={handleChangeItemName}
                value={itemName}
              />
              <label className="upload__text" htmlFor="desc">
                Add an Item description
              </label>
              <textarea
                className={
                  isDescriptionValid()
                    ? "input upload__desc-input"
                    : "input upload__desc-input upload__desc-input--error"
                }
                name="description"
                id="desc"
                placeholder="Add an Item description"
                onChange={handleChangeDesc}
                value={description}
              ></textarea>
              {/* <DropdownSelect
                labelName="Category"
                items={[
                  "Please select a category",
                  "Electronics",
                  "Outdoor Gear",
                  "Apparel",
                  "Accessories",
                  "BBQ tools",
                  "Portable grill",
                  "miscellaneous",
                ]}
                defaultValue="Please select a category"
                fieldName="category"
                name="category"
                id="category"
                onChange={handleChangeCategory}
                value={category}
              /> */}
              <DropdownSelect
                labelName="Category"
                items={[
                  "Please select a category",
                  "Electronics",
                  "Outdoor Gear",
                  "Apparel",
                  "Accessories",
                  "BBQ tools",
                  "Portable grill",
                  "miscellaneous",
                ]}
                defaultValue="Please select a category"
                fieldName="category"
                onChange={handleChangeCategory}
                value={category}
              />
            </div>
          </div>
          <div className="upload__ending">
            <Button
              btnType="submit"
              className="btn btn--upload"
              btnContent="publish"
            />
            <button className="upload__cancel" onClick={handleOnClick}>
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
