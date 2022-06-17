module.exports = (sequelize, DataTypes) => {
  const Routine = sequelize.define('Routine', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    routineName: DataTypes.STRING,
    days: DataTypes.ARRAY(DataTypes.INTEGER),
  });
  Routine.associate = (db) => {
    Routine.hasMany(db.Exercise);
  };

  return Routine;
};
