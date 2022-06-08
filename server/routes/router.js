const { Router } = require('express');
const { createUser } = require('../controllers/controller');

const router = new Router();


router.post('/user', createUser);

// router.get('/:userId/dashboard', sendRoutines);




module.exports = {
  router
};