const db = require('../../models/db');

const readRoutines = async (userId) => {
  try {
    await db.Routine.findAll({
      where: {
        UserId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const writeRoutine = async (routine, userId) => {
  try {
    return await db.Routine.create({
      routineName: routine.routineName,
      days: routine.days,
      UserId: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRoutine = async (routine, userId) => {
  // Test me
  // should update single routine where foreign key matches userId and routineName matches
  try {
    await db.Routine.update(
      { routineName: routine.name, days: routine.days },
      {
        where: {
          routineName: routine.name,
          UserId: userId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const destroyRoutine = async (routine, userId) => {
  // Test me
  // should destory routine where foreign key matches userId and where routineName matches. Should also destroy all associated exercises OR Create destroy all exercise query? Not sure if you can link
  try {
    await db.Routine.destroy({
      where: {
        routineName: routine.name,
        UserId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { writeRoutine, readRoutines, updateRoutine, destroyRoutine };
