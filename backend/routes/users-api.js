const express = require('express');
const router = express.Router();
const {getUserByEmailAndPassword} = require('../db/database');

// Login route
router.get("/", (req,res) => {
 res.json({message: "root"});
})
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  getUserByEmailAndPassword(email, password)
    .then(user => {
      if (user) {
         res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.username } });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// Logout route
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;