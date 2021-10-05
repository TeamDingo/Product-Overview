const productionDB = require('../database/index.js');
const makeApp = require('./app.js');
const PORT = 3000 || process.env.PORT;

const app = makeApp(productionDB);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
