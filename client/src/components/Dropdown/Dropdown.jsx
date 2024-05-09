import React from "react";
import "./Dropdown.scss";
import dropdownArrow from "../../assets/icons/arrow_drop_down-24px.svg";

function DropdownSelect(props) {
  const { items, labelName, fieldName, onChange, value } = props;

  const handleCategoryChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={`inputEl inputEl-dropdown}`}>
      <label className="inputEl__label label" htmlFor={fieldName}>
        {labelName}
      </label>
      <div className="inputEl-dropdown">
        <select
          className="inputEl__dropdown"
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={handleCategoryChange}
        >
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span className="inputEl__dropdown__icon">
          <img src={dropdownArrow} alt="Dropdown Arrow" />
        </span>
      </div>
    </div>
  );
}

export default DropdownSelect;
