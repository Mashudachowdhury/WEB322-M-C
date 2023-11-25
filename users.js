const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.get('/', (req, res) => {
  res.json(UserService.getAllUsers());
});

router.get('/:id', (req, res) => {
  res.json(UserService.getUserById(req.params.id));
});

router.post('/', (req, res) => {
  res.json(UserService.createUser(req.body));
});

router.delete('/:id', (req, res) => {
  res.json(UserService.deleteUser(req.params.id));
});

module.exports = router;