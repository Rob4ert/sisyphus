const Express = require('express');
const cors = require('cors');

const { router } = require('./routes/router');


const PORT = 3000;
const app = new Express();

app.use(cors());
app.use(Express.json());
app.use(router);


(async () => {
  try {
    app.listen(PORT, console.log(`Listen in http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
