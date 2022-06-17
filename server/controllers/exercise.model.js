// const { prisma } = require('../db');

// const writeExercise = async function (userId, exercise) {
//   const { name, isWeighted, isTimed } = exercise;
//   return await prisma.exercise.create({
//     data: {
//       name,
//       isWeighted,
//       isTimed,
//       user: { connect: { id: parseInt(userId) } },
//     }
//   });

// };

// const eraseExercise = async function (id) {

//   return await prisma.exercise.delete({
//     where: {
//       id: parseInt(id)
//     },
//   });
// };

// const rewriteExercise = async function (id, exercise) {

//   const { name, isWeighted, isTimed } = exercise;
//   return await prisma.exercise.update({
//     where: { id: parseInt(id) },
//     data: { name, isWeighted, isTimed },
//   });
// };

// const readAllExercises = async function (userId) {
//   return await prisma.exercise.findMany({
//     where: { UserId: parseInt(userId) },
//   });
// };

// module.exports = {
//   writeExercise, eraseExercise, rewriteExercise, readAllExercises
// };
