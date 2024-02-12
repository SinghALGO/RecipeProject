const db = require('../connection');

const getFavsByUser = () => {
  return db.query('SELECT * FROM fav favorites;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavsByUser };
