const readRoutines = async (userId) => {
  // should return all routines where userID matches foreign key
};

const writeRoutine = async (routine, userId) => {
  try {
    await db.Routine.create({
      routineName: routine.name,
      days: routine.days,
      UserId: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRoutine = async () => {
  // should update single routine where foreign key matches userId and routineName matches
};

const destroyRoutine = async () => {
  // should destory routine where foreign key matches userId and where routineName matches. Should also destroy all associated exercises OR Create destroy all exercise query? Not sure if you can link
};

module.exports = { writeRoutine, readRoutines, updateRoutine, destroyRoutine };
