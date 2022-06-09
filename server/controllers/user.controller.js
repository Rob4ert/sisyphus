const { prisma } = require('../db');

// remember to add
// res.status(409);
// res.send('email already in use');
const createUser = async function (req, res) {
  const { name, password, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        password,
        email
      }
    });
    res.status(201);
    res.send({ error: null, data: user });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error creating user, please try again.", data: null });
    console.log('error :>> ', error);
  }
};


module.exports = {
  createUser
};




