
const checkLoggedIn = async (req, res, next) => {
  if (req.session.uid) next();
  else {
    res.status(401);
    res.send('you are not logged in!');
  }
};

module.exports = { checkLoggedIn };