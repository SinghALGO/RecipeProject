const express = require('express');
const router = express.Router();

const {
  getAllRecipes,
  getRecipesByCategory,
  getFavoriteRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getCategoriesList,
  addNewFavorite,
  removeFavorite
} = require("../db/database");

// Get all recipes
router.get('/', (req, res) => {
  getAllRecipes()
    .then(recipes => res.json(recipes))
    .catch(error => {
      console.error('Error fetching all recipes:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Get all categories
router.get('/categories', (req, res) => {
  getCategoriesList()
    .then(categories => res.json(categories))
    .catch(error => {
      console.error('Error fetching all categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Get recipes by category ID
router.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  getRecipesByCategory(categoryId)
    .then(recipes => res.json(recipes))
    .catch(error => {
      console.error('Error fetching recipes by category ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Get favorite recipes
router.get('/favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  getFavoriteRecipes(userId)
    .then(favoriteRecipes => res.json(favoriteRecipes))
    .catch(error => {
      console.error('Error fetching favorite recipes:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Add a new favorite recipe 
router.post('/favorites', (req, res) => {
  console.log("inside router fav");
  const { userId, recipeData } = req.body;
  console.log("req body",userId,recipeData);
  addNewFavorite(userId,recipeData)
    .then(newFavoriteRecipe => res.status(201).json(newFavoriteRecipe))
    .catch(error => {
      console.error('Error adding new Favorite recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Remove a favorite recipe
router.delete('/favorites/:userId/:recipeId', (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;
  
  removeFavorite(userId, recipeId)
    .then(() => res.json({ message: 'Favorite recipe removed successfully' }))
    .catch(error => {
      console.error('Error removing favorite recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Add a new recipe
router.post('/', (req, res) => {
  const recipeData = req.body;
  addRecipe(recipeData)
    .then(newRecipe => res.status(201).json(newRecipe))
    .catch(error => {
      console.error('Error adding new recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Edit an existing recipe
router.put('/:id', (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipeData = req.body;
  editRecipe(recipeId, updatedRecipeData)
    .then(updatedRecipe => res.json(updatedRecipe))
    .catch(error => {
      console.error('Error editing recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete an existing recipe
router.delete('/:id', (req, res) => {
  const recipeId = req.params.id;
  deleteRecipe(recipeId)
    .then(() => res.json({ message: 'Recipe deleted successfully' }))
    .catch(error => {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
