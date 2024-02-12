import React, { useState } from "react";
import AddRecipeForm from "../components/AddRecipeForm/AddRecipeForm";
import SearchForm from "../components/SearchForm/SearchForm";
import RecipeList from "../components/RecipeList/RecipeList";
import "./HomeRoute.css";
const HomeRoute = ({ recipes , clickHandler}) => {
  let recipesToShow = recipes;
  let myFlag = false;
  if (recipesToShow.length > 0 && recipesToShow[recipesToShow.length - 1] === "my_recipes") {
    recipesToShow = recipesToShow.slice(0, -1);
    myFlag = true;
  }
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddRecipeClick = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };
  return (
    <div className="home-page">
      <SearchForm />
      {recipes.length > 0 && recipes[recipes.length - 1] === "my_recipes" && (
        <button onClick={handleAddRecipeClick} className="add-recipe-button">Add a new Recipe</button>
      )}
      <RecipeList recipes={recipesToShow} clickHandler={clickHandler} myFlag={myFlag}/>
      {showAddForm && <AddRecipeForm onClose={handleCloseForm} />}
    </div>
  );
};




export default HomeRoute;
