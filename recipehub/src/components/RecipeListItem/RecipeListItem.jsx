import "./RecipeListItem.css";
const RecipeListItem = ({ recipe, clickHandler}) => {
  const onRecipeClick = () => {
    clickHandler(recipe);
  };
  return (
    <section className="recipe-list__item" onClick={onRecipeClick}>
      <img className="recipe-list__image" src={recipe.img} alt={recipe.name}></img>
      <div className="recipe-list__user-details">
        <p>{recipe.name}</p>
        <p>Cooking time: {recipe.cooking_time} mins</p>
      </div>
    </section>
  );
};
export default RecipeListItem;
