import React, { useState } from "react";
import "./UploadPage.scss";
import { storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const [categoryId, setCategoryId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectFile, setSelectFile] = useState(null);
  const [preview, setPreview] = useState(uploadPreview);
  const [error, setError] = useState({});

  const handleChangeItemName = (event) => {
    setItemName(event.target.value);
    setError((prevState) => ({ ...prevState, itemName: "" }));
  };

  const handleChangeDesc = (event) => {
    setDescription(event.target.value);
    setError((prevState) => ({ ...prevState, description: "" }));
  };

  const handleChangeCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setCategoryId(getCategoryId(selectedCategory));
    setError((prevState) => ({ ...prevState, category: "" }));
  };

  const handleChangeQuantity = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
    setError((prevState) => ({ ...prevState, quantity: "" }));
  };

  const handleOnClick = () => {
    navigate("/");
  };

  const getCategoryId = (name) => {
    const categories = {
      Electronics: 1,
      "Outdoor Gear": 2,
      Hobbies: 3,
      Apparel: 4,
      Accessories: 5,
      "BBQ tools": 6,
      "Cleaning supplies": 7,
      "Grilling baskets or trays": 8,
      Helmet: 9,
      "Roller skates": 10,
      "Camp stove": 11,
      "Portable grill": 12,
      Miscellaneous: 13,
      "Small Appliances": 14,
    };
    return categories[name] || null;
  };

  const handleImageUpload = async (uploadedImage) => {
    try {
      let imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const directoryPath = "images";
      const storageRef = ref(storage, `${directoryPath}/${imageName}`);
      const snapshot = await uploadBytes(storageRef, uploadedImage);
      const uploadedImageUrl = await getDownloadURL(snapshot.ref);
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const uploadedImage = selectFile;
        const imageUrl = await handleImageUpload(uploadedImage);
        const formData = {
          image_url: imageUrl,
          item_name: itemName,
          description: description,
          category_id: categoryId,
          quantity: Number(quantity),
        };

        await axios.post(`${apiURL}/api/inventories`, formData);
        navigate("/inventory");
      }
    } catch (error) {
      console.error("Error uploading item:", error);
    }
  };
  const isFormValid = () => {
    let isValid = true;
    let errors = {};

    if (!itemName || itemName.length < 3) {
      errors.itemName = "Item name must be at least 3 characters";
      isValid = false;
    }

    if (!description || description.length < 15) {
      errors.description = "Description must be at least 15 characters";
      isValid = false;
    }

    if (!selectFile) {
      errors.selectFile = "Please select an image";
      isValid = false;
    }
    if (!category) {
      errors.selectFile = "Please select category";
      isValid = false;
    }

    setError(errors);
    return isValid;
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
          <h1 className="upload__heading">Add New Product</h1>
          <div className="upload__big-wrap">
            <div className="upload__thumbnail-info">
              <p className="upload__text">Product thumbnail</p>
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
              {error.selectFile && <p className="error">{error.selectFile}</p>}
            </div>
            <div className="upload__wrapper">
              <label className="upload__text" htmlFor="item_name">
                Item Name
              </label>
              <input
                className={
                  error.itemName
                    ? "input upload__name-input upload__name-input--error"
                    : "input upload__name-input"
                }
                type="text"
                name="item_name"
                id="item_name"
                placeholder="Add an item name"
                onChange={handleChangeItemName}
                value={itemName}
              />
              {error.itemName && <p className="error">{error.itemName}</p>}
              <label className="upload__text" htmlFor="desc">
                Add an Item description
              </label>
              <textarea
                className={
                  error.description
                    ? "input upload__desc-input upload__desc-input--error"
                    : "input upload__desc-input"
                }
                name="description"
                id="desc"
                placeholder="Add an Item description"
                onChange={handleChangeDesc}
                value={description}
              ></textarea>
              {error.description && (
                <p className="error">{error.description}</p>
              )}
              <DropdownSelect
                labelName="Category"
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
                  "miscellaneous",
                ]}
                defaultValue="Please select a category"
                fieldName="category"
                onChange={handleChangeCategory}
                value={category}
              />
              {error.category && <p className="error">{error.category}</p>}
              <label className="upload__text" htmlFor="qty">
                Quantity
              </label>
              <input
                className="input upload__name-input"
                type="number"
                name="quantity"
                id="quantity"
                placeholder="enter quantity"
                onChange={handleChangeQuantity}
                value={quantity}
              />
              {error.quantity && <p className="error">{error.quantity}</p>}
            </div>
          </div>
          <div className="upload__ending">
            <Button
              btnType="submit"
              className="btn btn--upload"
              btnContent="Add"
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
