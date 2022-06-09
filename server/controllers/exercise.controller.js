const { writeExercise, eraseExercise, rewriteExercise, readAllExercises } = require('../models/exercise.model');


const createExercise = async function (req, res) {
  const { userId } = req.params;
  try {
    const exercise = await writeExercise(userId, req.body);
    res.status(201);
    res.send({ data: exercise, error: null });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error creating exercise, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const deleteExercise = async function (req, res) {
  const { id } = req.params;
  try {
    const exercise = eraseExercise(id);
    res.status(201);
    res.send({ data: exercise, error: null });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error deleting exercise, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const updateExercise = async function (req, res) {
  const { id } = req.params;
  try {
    const exercise = await rewriteExercise(id, req.body);
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
    const exercises = readAllExercises(userId);
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
