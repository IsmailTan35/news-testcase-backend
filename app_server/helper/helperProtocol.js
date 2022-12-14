const { createServer } = require("http");

const httpServer = (app, port) => {
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.info(new Date() + " Server is listening on port " + port);
  });
  return httpServer;
};

module.exports = {
  httpServer,
};
