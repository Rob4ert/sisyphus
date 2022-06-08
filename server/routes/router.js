const { Router } = require('express');
const { createUser } = require('../controllers/user');
const { createExercise } = require('../controllers/exercise');

const router = new Router();


router.post('/user', createUser);

router.post('/exercise', createExercise);

// router.get('/:userId/dashboard', sendRoutines);




module.exports = {
  router
};