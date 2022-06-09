const { findUserById } = require('../models/user.model');



const checkLoggedIn = async function (req, res, next) {
  if (req.session.uid) next();
  else {
    res.status(401);
    res.send('you are not logged in!');
  }
};

const checkIsUser = async function (req, res, next) {
  const id = req.session.uid;
  const userDb = await findUserById(id);
  if (userDb.id === parseInt(req.params.userId)) next();
  else {
    res.status(401);
    res.send('you are not allowed!');
  }
};

module.exports = { checkLoggedIn, checkIsUser };