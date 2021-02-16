"use strict";

const chalk = require(`chalk`);
const express = require(`express`);

const initApiRouter = require(`../api`);

const PORT = 3000;

const app = express();

module.exports = async (port = PORT) => {
  const apiRoute = await initApiRouter();

  app.use(express.json());
  app.use(`/api`, apiRoute);

  app.listen(port, (err) => {
    if (err) {
      return console.error(`Server creation error`, err);
    }
    return console.info(chalk.green(`Waiting for connections on ${port}`));
  });
};
