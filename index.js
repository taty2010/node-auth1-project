const server = require('./api/server');

const PORT = process.envPORT || 5000;
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});