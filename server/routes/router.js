const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');
const { createExercise, deleteExercise, updateExercise, getExercisesByUser } = require('../controllers/exercise.controller');
const { createRoutine, deleteRoutine, updateRoutine, getRoutinesByUser } = require('../controllers/routine.controller');


const router = new Router();

// users
router.post('/', createUser);

// exercises
router.post('/:userId/exercise', createExercise);
router.delete('/:userId/exercise/:id', deleteExercise);
router.put('/:userId/exercise/:id', updateExercise);
router.get('/:userId/exercise/', getExercisesByUser);

// sets
router.post('/:userId/Routine', createRoutine);
router.delete('/:userId/Routine/:id', deleteRoutine);
router.put('/:userId/Routine/:id', updateRoutine);
router.get('/:userId/Routine/', getRoutinesByUser);

module.exports = {
  router
};