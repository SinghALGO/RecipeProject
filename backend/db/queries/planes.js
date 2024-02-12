const db = require('../connection');

const getAllPlanes = () => {
  return db.query('SELECT * FROM planes;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllPlanes };
