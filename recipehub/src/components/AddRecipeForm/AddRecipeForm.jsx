import React, { useState } from "react";
import "./AddRecipeForm.css";
const AddRecipeForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setName("");
    setIngredients("");
    setCookingTime("");
    setDescription("");
    setCategory("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Ingredients:</label>
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      <label>Cooking Time:</label>
      <input type="text" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
      <label>Description:</label>
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      <label>Image URL:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        <option value="1">Breakfast</option>
        <option value="2">Lunch</option>
        <option value="3">Appetizer</option>
        <option value="4">Dessert</option>
      </select>
      <button type="submit">Add Recipe</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AddRecipeForm;