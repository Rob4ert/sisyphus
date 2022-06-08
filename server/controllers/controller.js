const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




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
    res.send(user);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

module.exports = {
  createUser
};




