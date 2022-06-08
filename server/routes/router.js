const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');
const { createExercise, deleteExercise, updateExercise, getExercisesByUser } = require('../controllers/exercise');

const router = new Router();

// users
router.post('/', createUser);

// exercises
router.post('/:userId/exercise', createExercise);
router.delete('/:userId/exercise/:id', deleteExercise);
router.put('/:userId/exercise/:id', updateExercise);
router.get('/:userId/exercise/', getExercisesByUser);



module.exports = {
  router
};