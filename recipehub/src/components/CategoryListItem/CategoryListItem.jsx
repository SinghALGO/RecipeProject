import React from "react";
import "./CategoryListItem.css"


const CategoryListItem = ({ categoryData , categoryClickHandler}) => {
  const clickHandler = () => {
    categoryClickHandler(categoryData.id);
  }
  
  return (
    <div className="topic-list__item" onClick={clickHandler} >
      <span>{categoryData.name}</span>
    </div>
  );
};

export default CategoryListItem;
