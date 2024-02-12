import React from "react";
import CategoryListItem from "../CategoryListItem/CategoryListItem";
import "./CategoryList.css"

const CategoryList = ({ categories, categoryClickHandler }) => {
  const categoriesArray = categories.map((category) => {
    return (
      <CategoryListItem
        key={category.id}
        categoryData={category}
        categoryClickHandler={categoryClickHandler}
      />
    );
  });
  return <div className="category-list">{categoriesArray}</div>;
};

export default CategoryList;
