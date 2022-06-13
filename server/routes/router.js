const { Router } = require('express');
const { checkLoggedIn, checkIsUser } = require('../middlewares/auth.middleware');
const { createUser, login, logout, getUser } = require('../controllers/user.controller');
const { createExercise, deleteExercise, updateExercise, getExercisesByUser } = require('../controllers/exercise.controller');
const { createRoutine, deleteRoutine, updateRoutine, getRoutinesByUser } = require('../controllers/routine.controller');
const { createSet, deleteSet, updateSet, getSetsByDay } = require('../controllers/set.controller');
const { getAllDays } = require('../controllers/days.controller');
const { signInValidator, signInConfig, logInConfig, logInValidator } = require('../middlewares/validators.middleware');

const router = new Router();

// users
router.post('/', createUser);
router.post('/login', logInConfig, logInValidator, login);
router.get('/login', getUser);
router.post('/logout', checkLoggedIn, logout);

// exercises
// router.post('/:userId/exercise', checkLoggedIn, checkIsUser, createExercise);
// router.delete('/:userId/exercise/:id', checkLoggedIn, checkIsUser, deleteExercise);
// router.put('/:userId/exercise/:id', checkLoggedIn, checkIsUser, updateExercise);
// router.get('/:userId/exercise/', checkLoggedIn, checkIsUser, getExercisesByUser);

// routine
router.post('/routine', checkLoggedIn, createRoutine);

router.delete('/:userId/routine/:id', checkLoggedIn, checkIsUser, deleteRoutine);
router.put('/:userId/routine/:id', checkLoggedIn, checkIsUser, updateRoutine);
router.get('/routine', checkLoggedIn, getRoutinesByUser);

// days

router.get('/routine/:routineId', checkLoggedIn, getAllDays);

// sets
router.post('/:userId/set', checkLoggedIn, checkIsUser, createSet);
router.delete('/:userId/set/:id', checkLoggedIn, checkIsUser, deleteSet);
router.put('/:userId/set/:id', checkLoggedIn, checkIsUser, updateSet);
router.get('/:userId/set/', checkLoggedIn, checkIsUser, getSetsByDay);


module.exports = {
  router
};