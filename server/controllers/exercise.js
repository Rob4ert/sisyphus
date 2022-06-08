const { prisma } = require('../db');

const createExercise = async function (req, res) {
  const { name, isWeighted, isTimed, userId } = req.body;
  try {
    const exercise = await prisma.exercise.create({
      data: {
        name,
        isWeighted,
        isTimed,
        User: { connect: { id: userId } },
      }
    });
    res.status(201);
    res.send(exercise);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

module.exports = {
  createExercise
};
