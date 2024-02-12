const db = require('../connection');

const getFeatured = () => {
  return db.query('SELECT * FROM planes;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFeatured };
