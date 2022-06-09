const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');
const { createExercise, deleteExercise, updateExercise, getExercisesByUser } = require('../controllers/exercise.controller');
const { createRoutine, deleteRoutine, updateRoutine, getRoutinesByUser } = require('../controllers/routine.controller');
const { createSet, deleteSet, updateSet, getSetsByDay } = require('../controllers/set.controller');

const router = new Router();

// users
router.post('/', createUser);

// exercises
router.post('/:userId/exercise', createExercise);
router.delete('/:userId/exercise/:id', deleteExercise);
router.put('/:userId/exercise/:id', updateExercise);
router.get('/:userId/exercise/', getExercisesByUser);

// routine
router.post('/:userId/routine', createRoutine);
router.delete('/:userId/routine/:id', deleteRoutine);
router.put('/:userId/routine/:id', updateRoutine);
router.get('/:userId/routine/', getRoutinesByUser);

// sets
router.post('/:userId/set', createSet);
router.delete('/:userId/set/:id', deleteSet);
router.put('/:userId/set/:id', updateSet);
router.get('/:userId/set/', getSetsByDay);


module.exports = {
  router
};