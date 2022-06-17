const { Router } = require('express');
// const { checkLoggedIn } = require('../middlewares/auth.middleware');
// const { createUser, login, logout, getUser } = require('../controllers/user.controller');
// const { createRoutine, deleteRoutine, updateRoutines, getRoutinesByUser } = require('../controllers/routine.controller');
// const { signInValidator, signInConfig, logInConfig, logInValidator } = require('../middlewares/validators.middleware');

const router = new Router();

// // users
// router.post('/', signInConfig, signInValidator, createUser);
// router.post('/login', logInConfig, logInValidator, login);
// router.get('/login', getUser);
// router.post('/logout', checkLoggedIn, logout);



// // routine
// router.post('/routine', checkLoggedIn, createRoutine);
// router.put('/routine', checkLoggedIn, updateRoutines);
// router.delete('/routine', checkLoggedIn, deleteRoutine);
// router.get('/routine', checkLoggedIn, getRoutinesByUser);





module.exports = {
  router
};