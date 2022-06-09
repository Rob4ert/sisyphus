const { prisma } = require('../db');

const createRoutine = async function (req, res) {
  const { userId } = req.session.uid;
  const { days, name } = req.body;
  try {
    const routine = await prisma.routine.create({
      data: {
        days: {
          create: [
            ...days
          ]
        },
        name,
        user: { connect: { id: parseInt(userId) } },
      },
      include: {
        days: true, // Include all posts in the returned object
      },
    });
    res.status(201);
    res.send({ error: null, data: routine });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error creating routine, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const deleteRoutine = async function (req, res) {
  const { id } = req.params;
  try {
    const routine = await prisma.routine.delete({
      where: {
        id: parseInt(id)
      },
    });
    res.status(201);
    res.send({ error: null, data: routine });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error deleting routine, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const updateRoutine = async function (req, res) {
  const { id } = req.params;
  const routine = req.body;
  try {
    const newRoutine = await prisma.routine.update({
      where: { id: parseInt(id) },
      data: routine,
    });
    res.status(201);
    res.send({ error: null, data: newRoutine });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error updating routine, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

const getRoutinesByUser = async function (req, res) {
  const { userId } = req.session.uid;
  try {
    const routines = await prisma.routine.findMany({
      where: { UserId: parseInt(userId) },
    });
    res.status(201);
    res.send({ error: null, data: routines });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error fetching routines, please try again.", data: null });
    console.log('error :>> ', error);
  }
};

module.exports = {
  createRoutine, deleteRoutine, updateRoutine, getRoutinesByUser
};