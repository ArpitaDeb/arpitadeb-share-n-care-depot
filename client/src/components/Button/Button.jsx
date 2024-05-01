import React from 'react'
import "./Button.scss";

export const Button = (props) => {
  const { btnContent, className, handleButtonOnClick, btnType } = props;
  return (
    <button type={btnType} onClick={handleButtonOnClick} className={className}>{btnContent}</button>
  )
}

export default Button; 