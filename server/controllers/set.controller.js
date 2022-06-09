const { prisma } = require('../db');

const createSet = async function (req, res) {

  const { weight, time, reps, fail, exercise, day } = req.body;
  try {
    const set = await prisma.set.create({
      data: {
        weight,
        time,
        fail,
        reps,
        day: { connect: { id: parseInt(day) } },
        exercise: { connect: { id: parseInt(exercise) } },
      }
    });
    res.status(201);
    res.send({ error: null, data: set });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error creating set, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const deleteSet = async function (req, res) {
  const { id, userId } = req.params;
  try {
    const set = await prisma.set.delete({
      where: {
        id: parseInt(id)
      },
    });
    res.status(201);
    res.send({ error: null, data: set });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error deleting set, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const updateSet = async function (req, res) {
  const { id } = req.params;
  const { weight, time, reps, fail, exercise, day } = req.body;
  try {

    const set = await prisma.set.update({
      where: { id: parseInt(id) },
      data: {
        weight,
        time,
        fail,
        reps,
        day: { connect: { id: parseInt(parseInt(day)) } },
        exercise: { connect: { id: parseInt(exercise) } },
      },
    });
    res.status(201);
    res.send({ error: null, data: set });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error updating set, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const getSetsByDay = async function (req, res) {
  const { userId, dayId } = req.params;
  try {
    const sets = await prisma.set.findMany({
      where: { day: parseInt(dayId) },
    });
    res.status(201);
    res.send({ error: null, data: sets });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error fetching sets, please try again.", data: null });
    console.log('error :>> ', error);
  }
};


module.exports = {
  createSet, deleteSet, updateSet, getSetsByDay
};