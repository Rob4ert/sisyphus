const { prisma } = require('../db');

const createRoutine = async function (req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  try {
    const routine = await prisma.routine.create({
      data: {
        name,
        User: { connect: { id: parseInt(userId) } },
      }
    });
    res.status(201);
    res.send(routine);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

const deleteRoutine = async function (req, res) {
  const { id, userId } = req.params;
  try {
    const routine = await prisma.routine.delete({
      where: {
        id: parseInt(id)
      },
    });
    res.status(201);
    res.send(routine);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

const updateRoutine = async function (req, res) {
  const { id, userId } = req.params;
  const { name, isWeighted, isTimed } = req.body;
  try {

    const routine = await prisma.routine.update({
      where: { id: parseInt(id) },
      data: { name, isWeighted, isTimed },
    });
    res.status(201);
    res.send(routine);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

const getRoutinesByUser = async function (req, res) {
  const { userId } = req.params;
  try {
    const Routines = await prisma.routine.findMany({
      where: { UserId: parseInt(userId) },
    });
    res.status(201);
    res.send(Routines);
  } catch (error) {
    res.status(401);
    res.send(error);
    console.log('error :>> ', error);
  }
};

module.exports = {
  createRoutine, deleteRoutine, updateRoutine, getRoutinesByUser
};