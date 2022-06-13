const { prisma } = require('../db');
const { readRoutines } = require('./routine.model');


const findUser = async function (email) {
  const newUser = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      routines: true,
    },
  }
  );
  newUser.routines = await readRoutines(newUser.id);
  // newUser.routines.forEach(routine => delete routine.userId);
  return newUser;
};

const findUserById = async function (id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const writeUser = async function (user) {
  const { name, password, email } = user;
  return await prisma.user.create({
    data: {
      name,
      password,
      email
    }
  });
};



module.exports = {
  findUser, writeUser, findUserById
};
