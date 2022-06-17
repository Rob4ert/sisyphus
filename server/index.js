const Express = require('express');
const session = require('express-session');
const cors = require('cors');

const { router } = require('./routes/router');


const corsConfig = {
  origin: 'http://localhost:4200',
  credentials: true
};

const app = new Express();
const PORT = 3000;
app.use(cors(corsConfig));
app.set('trust proxy', 1); // trust first proxy
// app.use(session({
//   name: 'sessionId',
//   secret: process.env.COOKIE_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // should be true when deploy
//     sameSite: 'lax',
//     httpOnly: false, // should be true when deploy
//   }
// }));
app.use(Express.static('../client/dist'));
app.use(Express.json());
app.use(router);


(async () => {
  try {
    app.listen(PORT, console.log(`Listen in http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
