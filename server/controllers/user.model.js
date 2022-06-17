// const { prisma } = require('../db');
// const { readRoutines } = require('./routine.model');

// const findUser = async function (email) {
//   const newUser = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//     include: {
//       routines: true,
//     },
//   });
//   newUser.routines = await readRoutines(newUser.id);
//   return newUser;
// };

// const findUserById = async function (id) {
//   const newUser = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
//   newUser.routines = await readRoutines(newUser.id);
//   return newUser;
// };

// const writeUser = async function (user) {
//   const { name, password, email } = user;
//   return await prisma.user.create({
//     data: {
//       name,
//       password,
//       email,
//     },
//   });
// };

// module.exports = {
//   findUser,
//   writeUser,
//   findUserById,
// };
