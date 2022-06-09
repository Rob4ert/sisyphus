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
        user: { connect: { id: parseInt(userId) } },
      }
    });
    res.status(201);
    res.send({ data: exercise, error: null });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error creating exercise, please try again.", data: null });
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
    res.send({ data: exercise, error: null });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error deleting exercise, please try again.", data: null });
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
    res.send({ data: exercise, error: null });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error updating exercise, please try again.", data: null });
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
    res.send({ data: exercises, error: null });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error fetching exercise, please try again.", data: null });
    console.log('error :>> ', error);
  }
};


module.exports = {
  createExercise, deleteExercise, updateExercise, getExercisesByUser
};
