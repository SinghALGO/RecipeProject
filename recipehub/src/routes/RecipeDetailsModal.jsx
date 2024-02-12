import React from "react";
import "./RecipeDetailsModal.css";

const RecipeDetailsModal = ({ recipeData, clickHandler, userId, favRecipes, remFavHandler, addFavHandler}) => {
   const favRecipeIds = favRecipes.map(recipe => recipe.id);
   const favFlag = favRecipeIds.includes(recipeData[0].id);
   const myRecipe = recipeData[0].user_id===userId;
   const removeFavHandler = () => {
        remFavHandler({userId,recipeData:recipeData[0].id});
   }
   const saveFavHandler = () => {
     addFavHandler({userId,recipeData:recipeData[0].id});
   }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={clickHandler}>
            X
          </span>
          <h2>{recipeData[0].name}</h2>
          <div className="modal-img-details">
             <img src={recipeData[0].img} alt={recipeData[0].title} />
             <div className="modal-para">
              <h3>Cook time:</h3>
               <p>{recipeData[0].cooking_time} minutes</p>
          <h3>Ingredients:</h3>
          <p>{recipeData[0].ingredients}</p>
          <h3>Instructions:</h3>
          <p>{recipeData[0].description}</p>
             </div>
          </div>


        </div>
        <div className="modal-buttons">
            {userId !== "" && (
            <>
              {favFlag ? (
                <button onClick={removeFavHandler}>Remove from Favorites</button>
              ) : (
                <button onClick={saveFavHandler}>Save to Favorites</button>
              )}
              {!myRecipe && <button>Copy this template</button>}
            </>
          )}
          {recipeData[1]===true?<><button>Edit</button><button>Delete</button></>:<></>}
        </div>

      </div>
    </div>
  );
};

export default RecipeDetailsModal;
