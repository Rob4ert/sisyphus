const { readAllDays } = require('../models/day.model');


const getAllDays = async function (req, res) {
  const { routineId } = req.params;
  try {
    const days = await readAllDays(routineId);
    res.status(200);
    res.send({ error: null, data: days });
  } catch (error) {
    res.status(400);
    res.send({ error: "Error fetching days, please try again.", data: null });
    console.log('error :>> ', error);
  }

};

module.exports = {
  getAllDays
};
