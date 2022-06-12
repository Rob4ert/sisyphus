const { prisma } = require('../db');


const saveRoutine = async function (routine, userId) {
  const { routineName, days } = routine;
  const newRoutine = await prisma.routine.create({
    data: {
      routineName,
      user: { connect: { id: parseInt(userId) } },
    },
    include: {
      days: true,
    },
  });
  const newDays = await Promise.all(days.map(async (day) => {
    const newDay = await prisma.day.create({
      data: {
        dayName: day.dayName,
        routine: { connect: { id: newRoutine.id } },
      },
      include: {
        exercises: true,
      },
    });
    const newExercises = await Promise.all(day.exercises.map(async (exercise) => {
      const newExercise = await prisma.exercise.create({
        data: {
          sets: exercise.sets,
          reps: exercise.reps,
          exerciseName: exercise.exerciseName,
          day: { connect: { id: newDay.id } },
          user: { connect: { id: parseInt(userId) } },
        },
      });
      delete newExercise.userId;
      return newExercise;
    }));
    newDay.exercises = newExercises;
    return newDay;
  }));

  newRoutine.days = newDays;
  delete newRoutine.userId;
  return newRoutine;
};





module.exports = {
  saveRoutine
};
