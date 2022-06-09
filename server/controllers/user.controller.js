const { prisma } = require('../db');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.regenerate(() => {
      req.session.id = user.id;
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
  const { name, password, email } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) console.log(err);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          password: hash,
          email
        }
      });
      req.session.regenerate(() => {
        return req.session.id = user.id;
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

//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         password,
//         email
//       }
//     });
//     res.status(201);
//     res.send({ error: null, data: user });
//   } catch (error) {
//     res.status(400);
//     res.send({ error: "Error creating user, please try again.", data: null });
//     console.log('error :>> ', error);
//   }
// };


module.exports = {
  createUser
};




