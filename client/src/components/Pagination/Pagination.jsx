import React from "react";
import './Pagination.scss';
const RightArrow = () => (
  <svg viewBox="0 0 20 20" width="20px" height="20px">
    <path
      fill="#000"
      d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
    ></path>
  </svg>
);

const LeftArrow = () => (
  <svg viewBox="0 0 20 20" width="20px" height="20px">
    <path
      fill="#000"
      d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
    ></path>
  </svg>
);

const Pagination = ({ pageCount, currentPage, onChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return (
    <div className="container">
      <ul className="container__list">
        {!isFirstPage && (
          <li className="container__item">
            <button
              className="container__item-button"
              onClick={() => onChange(1)}
            >
              <LeftArrow />
            </button>
          </li>
        )}
        {Array.from({ length: pageCount }).map((_, index) => {
          const isCurrent = index + 1 === currentPage;
          return (
            <li className="container__item" key={index}>
              <button
                className={`container__item-button ${
                  isCurrent ? "container__item-button--current" : ""
                }`}
                onClick={() => onChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          );
        })}

        {!isLastPage && (
          <li className="container__item">
            <button
              className="container__item-button"
              onClick={() => onChange(currentPage + 1)}
            >
              <RightArrow />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
