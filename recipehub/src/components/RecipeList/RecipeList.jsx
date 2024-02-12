import RecipeListItem from "../RecipeListItem/RecipeListItem";
import "./RecipeList.css";
const RecipeList = ({ recipes, clickHandler, myFlag }) => {
  const recipeArray = recipes.map((recipe) => {
    const { id, img, name, cooking_time, ingredients,description, user_id } = recipe;
    const recipeObj = {
      id,
      img,
      name,
      cooking_time,
      ingredients,
      description,
      user_id,
      myFlag
    };
    return <RecipeListItem key={id} recipe={recipeObj} clickHandler={clickHandler} />;
  });
  return <ul className="recipe-list">{recipeArray}</ul>;
};
export default RecipeList;
