const bcrypt = require('bcrypt');
const db = require('../models/db');

const { findUser, findUserById } = require('./user.model');

const saltRounds = 10;

const createUser = async (req, res) => {
  const user = req.body;
  bcrypt.hash(user.password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    try {
      user.password = hash;
      const newUser = await db.User.create({
        email: user.email,
        name: user.name,
        password: user.password,
      }).catch((err) => console.log(err));
      req.session.regenerate(() => {
        return (req.session.uid = newUser.id);
      });
      delete newUser.password;
      delete newUser.id;
      res.status(201);
      res.send({ error: null, data: newUser });
    } catch (error) {
      if (error.meta?.target[0] === 'email') {
        res.status(409);
        res.send({ error: 'Email already in use.', data: null });
      } else {
        res.status(503);
        res.send();
      }
    }
  });
};
const getUser = async function (req, res) {
  const id = req.session.uid;
  try {
    const user = await findUserById(id);
    delete user.password;
    delete user.id;
    res.status(200);
    res.send({ error: null, data: user });
  } catch (error) {
    res.status(401);
    res.send({ error: 'You are not logged in.', data: null });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    res.send({ error: 'Missing password or email.', data: null });
  } else {
    const user = await findUser(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.regenerate(() => {
        req.session.uid = user.id;
        req.session.save(function (err) {
          if (err) return next(err);
          delete user.password;
          delete user.id;
          res.status(200);
          res.send({ error: null, data: user });
        });
      });
    } else {
      res.status(400);
      res.send({ error: 'wrong email or password.', data: null });
    }
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionId');
  res.status(200);
  res.send({ error: 'You are logged out.', data: null });
};

module.exports = {
  createUser,
  login,
  logout,
  getUser,
};
