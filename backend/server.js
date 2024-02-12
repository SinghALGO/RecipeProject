require('dotenv').config();

// Web server config
const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");


const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userApiRoutes = require("./routes/users-api");
const recipesApiRoutes = require("./routes/recipes-api");

app.use("/api/users", userApiRoutes);
app.use("/api/recipes", recipesApiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
