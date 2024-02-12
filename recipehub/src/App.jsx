import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomeRoute from "./routes/HomeRoute";
import RecipeDetailsModal from "./routes/RecipeDetailsModal";
import useApplicationData from "./hooks/useApplicationData";
function App() {
  const { state, toggleModal, categoryClickHandler, loginHandler, logoutHandler, favClickHandler, myRecipeClickHandler, logoClickHandler, remFavHandler, addFavHandler} = useApplicationData();
  return (
    <div className="App">
      <Navbar categories={state.categories} categoryClickHandler={categoryClickHandler} loginHandler={loginHandler} userId={state.userId} logoutHandler={logoutHandler} favClickHandler={favClickHandler} myRecipeClickHandler={myRecipeClickHandler} logoClickHandler={logoClickHandler}/>
      <HomeRoute recipes={state.recipes} clickHandler={toggleModal} />
      {state.modalStatus && (
        <RecipeDetailsModal
          recipeData={state.recipeData}
          clickHandler={toggleModal}
          userId={state.userId}
          favRecipes={state.favRecipes}
          remFavHandler={remFavHandler}
          addFavHandler={addFavHandler}
        />
      )}
    </div>
  );
}

export default App;
