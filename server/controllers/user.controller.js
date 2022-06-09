const bcrypt = require('bcrypt');

const { findUser, writeUser } = require('../models/user.model');

const saltRounds = 10;


const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await findUser(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.regenerate(() => {
      req.session.uid = user.id;
      req.session.save(function (err) {
        if (err) return next(err);
        res.status(201);
        res.send('you are logged in');
      }
      );
    }
    );

  } else {
    res.status(401);
    res.send('wrong email or password');
  }
};

const createUser = async function (req, res) {
  const user = req.body;
  bcrypt.hash(user.password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    try {
      user.password = hash;
      const newUser = await writeUser(user);
      req.session.regenerate(() => {
        return req.session.uid = newUser.id;
      });
      res.status(201);
      res.send();
    } catch (error) {
      if (error.meta?.target[0] === 'email') {
        res.status(409);
        res.send('email already in use');
      } else {
        res.status(503);
        res.send();
      }
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionId');
  res.status(201);
  res.send('you are logged out!');
};


module.exports = {
  createUser, login, logout
};




