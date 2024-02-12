const db = require('../connection');

const getMsgsByUser = () => {
  return db.query('SELECT * FROM messages;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMsgsByUser };
