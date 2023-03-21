const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById ,login} = require('../Controlleurs/User.Controller');

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get a specific user by ID
router.get('/:id', getUserById);

// Update a specific user by ID
router.put('/:id', updateUserById);

// Delete a specific user by ID
router.delete('/:id', deleteUserById);

//login user
router.post('/login', login);

module.exports = router;
