const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Routine = sequelize.define('Routine', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    routineName: DataTypes.STRING,
    // user_id: {
    //   type: DataTypes.INTEGER,

    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
  });
  Routine.associate = (db) => {
    Routine.hasMany(db.Exercise);
  };

  return Routine;
};
