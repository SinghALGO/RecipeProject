import heroImage from "../../assets/hero-image.jpg";
import "./SearchForm.css";
const SearchForm = () => {
  return (
    <section className="main-hero-form">
      <div className="search-container">
        <form className="search-form">
          <div className="form-group">
            <label htmlFor="category-select">Category:</label>
            <select id="category-select" name="category">
              <option value="">Select a category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="recipe-name">Recipe Name:</label>
            <input
              type="text"
              id="recipe-name"
              name="recipe"
              placeholder="Enter recipe name"
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <img
        src={heroImage}
        alt="Hero image of logo and dishes"
        className="hero-image"
      />
    </section>
  );
};
export default SearchForm;
