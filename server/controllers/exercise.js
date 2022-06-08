const { prisma } = require('../db');

const createExercise = async function (req, res) {
  const { userId } = req.params;
  const { name, isWeighted, isTimed } = req.body;
  try {
    const exercise = await prisma.exercise.create({
      data: {
        name,
        isWeighted,
        isTimed,
        User: { connect: { id: parseInt(userId) } },
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

const deleteExercise = async function (req, res) {
  const { id, userId } = req.params;
  try {
    const exercise = await prisma.exercise.delete({
      where: {
        id: parseInt(id)
      },
    });
    res.status(201);
    res.send(exercise);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

const updateExercise = async function (req, res) {
  const { id, userId } = req.params;
  const { name, isWeighted, isTimed } = req.body;
  try {

    const exercise = await prisma.exercise.update({
      where: { id: parseInt(id) },
      data: { name, isWeighted, isTimed },
    });
    res.status(201);
    res.send(exercise);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

const getExercisesByUser = async function (req, res) {
  const { userId } = req.params;
  try {
    const exercises = await prisma.exercise.findMany({
      where: { UserId: parseInt(userId) },
    });
    res.status(201);
    res.send(exercises);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};


module.exports = {
  createExercise, deleteExercise, updateExercise, getExercisesByUser
};
