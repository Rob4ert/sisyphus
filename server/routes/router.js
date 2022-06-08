const { Router } = require('express');
const { createUser } = require('../controllers/user');
const { createExercise, deleteExercise } = require('../controllers/exercise');

const router = new Router();

// users
router.post('/', createUser);

// exercises
router.post('/:userId/exercise', createExercise);
router.delete('/:userId/exercise/:id', deleteExercise);




module.exports = {
  router
};