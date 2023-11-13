const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const users = require('../fakeUsers.json');
  res.json(users); // respond with JSON containing fake users
});

router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = require('../fakeUsers.json');
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user); // respond with JSON containing the specific user
  } else {
    res.status(404).json({ message: 'User not found' }); // respond with a 404 status and an error message
  }
});

router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  let users = require('../fakeUsers.json');
  users = users.filter(user => user.id !== userId);

  // write updated users back to fakeUsers.json
  fs.writeFileSync('fakeUsers.json', JSON.stringify(users));

  res.json({ success: true, message: 'User deleted successfully' }); // respond with a success message
});

router.post('/', (req, res) => {
  const newUser = req.body;
  newUser.id = Date.now(); // use timestamp as a temporary ID
  let users = require('../fakeUsers.json');
  users.push(newUser);

  // write updated users back to fakeUsers.json
  fs.writeFileSync('fakeUsers.json', JSON.stringify(users));

  res.json(newUser); // respond with JSON containing the newly added user
});

module.exports = router;