const { prisma } = require('../db');


const findUser = async function (email) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
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
