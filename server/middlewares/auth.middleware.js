const { findUserById } = require('../models/user.model');



const checkLoggedIn = async function (req, res, next) {
  if (req.session.uid) next();
  else {
    res.status(401);
    res.send({ error: 'you are not logged in!', data: null });
  }
};

const checkIsUser = async function (req, res, next) {
  const id = req.session.uid;
  const userDb = await findUserById(id);
  if (userDb.id === parseInt(req.params.userId)) next();
  else {
    res.status(401);
    res.send({ error: "you are not allowed!.", data: null });
  }
};

module.exports = { checkLoggedIn, checkIsUser };