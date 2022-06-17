const writeExercise = async (exercise, routineId) => {
  try {
    await db.Exercise.create({
      exerciseName: exercise.name,
      reps: exercise.reps,
      sets: exercise.sets,
      isWeighted: exercise.isWeighted,
      isTimed: exercise.isTimed,
      RoutineId: routineId,
    });
  } catch (error) {
    console.log(error);
  }
};

const readExercises = async () => {
  //should return all exercises where routineId matches foreign key
};

const updateExercise = async () => {
  //should update and return single exercise where routineId matches foreign key and exercise name matches
};

const destroyExercise = async () => {
  //should destroy single exercise where routineId matches foreign key and exercise name matches
};

module.exports = {
  writeExercise,
  readExercises,
  updateExercise,
  destroyExercise,
};
