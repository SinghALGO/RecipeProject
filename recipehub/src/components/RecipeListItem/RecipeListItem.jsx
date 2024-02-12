import "./RecipeListItem.css";
const RecipeListItem = ({ recipe, clickHandler}) => {
  const onRecipeClick = () => {
    clickHandler(recipe);
  };
  return (
    <section className="recipe-list__item" onClick={onRecipeClick}>
<<<<<<< HEAD
      <img className="recipe-list__image" src={recipe.img}></img>
=======
      <img className="recipe-list__image" src={recipe.img} alt={recipe.name}></img>
>>>>>>> 96d9c6b2a41178eb3523e432b1d4d3e3e57900f2
      <div className="recipe-list__user-details">
        <p>{recipe.name}</p>
        <p>Cooking time: {recipe.cooking_time} mins</p>
      </div>
    </section>
  );
};
export default RecipeListItem;
