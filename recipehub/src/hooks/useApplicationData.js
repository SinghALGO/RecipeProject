import { useReducer, useEffect } from "react";

// 1. ADD RECIPE ACTION,
// 2. THEN ADD THE SWITCH CASE IN REDUCER FUNCTION,
// 3. ADD RECIPE FUNCTION TO ADD RECIPE addRecipe()
const ACTIONS = {
  SET_RECIPES: "SET_RECIPES",
  ADD_RECIPE: "ADD_RECIPE",
  EDIT_RECIPE: "EDIT_RECIPE",
  UPDATE_FAVORITE_RECIPE: "UPDATE_FAVORITE_RECIPE",
};

const initialState = {
  originalRecipes:[],
  recipes: [],
  favRecipes:[],
  recipeData: "",
  categories:[],
  categoryId:"",
  modalStatus: false,
  userId: ""
};

console.log(initialState.recipes);
// ADD SWITCH CASE
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_RECIPES:
      return { ...state, recipes: action.payload };
    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload };//This case sets state for the topicId
    case "SET_CATEGORY_ID":
      return {
        ...state,
        categoryId: action.payload,
      };
    case ACTIONS.ADD_RECIPE:
      return { ...state, recipes: action.payload };
    //This case will send photo data to modal and toggle modal status(true or false)
    case "SET_MODAL_DATA":
      return {
        ...state,
        recipeData: action.payload,
        modalStatus: !state.modalStatus,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload
      };
    case "SET_ORIGINAL_RECIPES":
      return {
        ...state,
        originalRecipes: action.payload
      };
    case "SET_FAV_DATA":
      return {
        ...state,
        favRecipes: action.payload
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('userId');
    if (storedUser) {
     dispatch({ type: "SET_USER_ID", payload: storedUser });
    }
  }, []);

  //useEffect runs when categoryId state changes. It checks if categoryId state is defined and is not null,empty or undefined, this way it wont run on intial render.
  useEffect(() => {
    if (state.categoryId) {
       getCategoryRecipe();
    }
  }, [state.categoryId]);

  useEffect(() => {
    if (state.userId !== "") {
       getFavoriteRecipe();
    }
  }, [state.userId, state.favRecipes]);



  const setRecipes = (recipes) => {
    dispatch({ type: ACTIONS.SET_RECIPES, payload: recipes });
   
  };
  const setOriginalRecipes = (recipes) => {
    dispatch({ type: "SET_ORIGINAL_RECIPES", payload: recipes });
  };
  const setCategories = (categories) => {
    dispatch({ type: ACTIONS.SET_CATEGORIES, payload: categories });
  };

  const addRecipe = (recipe) => {
    dispatch({ type: ACTIONS.ADD_RECIPE, payload: recipe });
  };
  const handleAddRecipe = async (recipe) => {
    try {
      const api = await fetch(
        `http://localhost:3014/api/recipes`
      );
      const data = await api.json();
      console.log(data);
      addRecipe(data.recipes);
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
    }
  };

  const getRecipes = async () => {
    try {
      const api = await fetch(
        `http://localhost:3014/api/recipes`
      );
      const data = await api.json();
      setRecipes(data);
      setOriginalRecipes(data);
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
    }
  };
  const getCategories = async () => {
    try {
      const api = await fetch(
        `http://localhost:3014/api/recipes/categories`
      );
      const data = await api.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getCategoryRecipe = async () => {
    try {
      const api = await fetch(
        `http://localhost:3014/api/recipes/category/${state.categoryId}`
      );
      const data = await api.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getFavoriteRecipe = async() => {
     try {
      const api = await fetch(
        `http://localhost:3014/api/recipes/favorites/${state.userId}`
      );
      const data = await api.json();
      dispatch({ type: "SET_FAV_DATA", payload: data });
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }
  const toggleModal = (recipe) => {
    let data;
    //checking if recipe argument is non empty as no argument is sent to toggleModal function when modal is closed.
    if (recipe) {
      data = state.recipes.filter((recipeEle) => recipeEle.id === recipe.id);
      data.push(recipe.myFlag);
    }
    dispatch({ type: "SET_MODAL_DATA", payload: data });
  };
  //function to handle category being clicked in the navigation bar
  const categoryClickHandler = (categoryId) => {
    dispatch({ type: "SET_CATEGORY_ID", payload: categoryId });
  };

  //function to handle user loggin in
  const loginHandler = async (loginInfo) => {
  try {
    const response = await fetch('http://localhost:3014/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.message === 'Login successful' && data.user && data.user.id) {
         dispatch({ type: "SET_USER_ID", payload: data.user.id });
        localStorage.setItem('userId', data.user.id);
      } else {
        // Handle login failure
        console.error('Login failed:', data.message);
      }

    } else {
      // Handle HTTP error
      console.error('HTTP error:', response.status);
    }
  } catch (error) {
    // Handle fetch error
    console.error('Fetch error:', error);
  }
};

const logoutHandler = () => {
    dispatch({ type: "SET_USER_ID", payload: "" });
    localStorage.removeItem('userId');
}
const favClickHandler = () => {
    setRecipes(state.favRecipes);
}
const myRecipeClickHandler = () => {
     let data = state.originalRecipes.filter((recipeEle) => recipeEle.user_id === state.userId);
     data.push("my_recipes");
     setRecipes(data);
}
const logoClickHandler = () => {
     getRecipes();
}
const remFavHandler = (userRecipeObj) => {
    const { userId, recipeData } = userRecipeObj;
    const url = `http://localhost:3014/api/recipes/favorites/${userId}/${recipeData}`;
    const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      getFavoriteRecipe();
      return response.json();
    })
    .then(data => {
      console.log('Favorite removed successfully:', data);
    })
    .catch(error => {
      console.error('Error removing favorite:', error);
     
    });
}
const addFavHandler = (userRecipeObj) => {
  console.log("entering addFavHandler function")
  const url = 'http://localhost:3014/api/recipes/favorites';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userRecipeObj)
  };

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      getFavoriteRecipe();
      return response.json();
    })
    .then(data => {
      console.log('Favorite added successfully:', data);
    })
    .catch(error => {
      console.error('Error adding favorite:', error);
    });
}

  return {
    state,
    handleAddRecipe,
    toggleModal,
    categoryClickHandler,
    loginHandler,
    logoutHandler,
    favClickHandler,
    myRecipeClickHandler,
    logoClickHandler,
    remFavHandler,
    addFavHandler
  };
};

export default useApplicationData;
