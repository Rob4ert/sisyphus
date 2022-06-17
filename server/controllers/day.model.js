// const { prisma } = require('../db');

// const readAllDays = async function (routineId) {
//   const days = await prisma.day.findMany({

//     where: { routineId: parseInt(routineId) },

//   },
//   );
//   const newDays = await Promise.all(days.map(async (day) => {
//     const exercises = await prisma.exercise.findMany({
//       where: { dayId: parseInt(day.id) }
//     }
//     );
//     exercises.forEach(exercise => delete exercise.userId);
//     day.weekDays = JSON.parse(day.weekDays);
//     day.exercises = exercises;
//     return day;
//   }

//   )
//   );
//   return newDays;
// };

// module.exports = {
//   readAllDays
// };
