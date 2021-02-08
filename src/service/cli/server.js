"use strict";

const chalk = require(`chalk`);
const express = require(`express`);

const apiRoutes = require(`../api`);

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(`/api`, apiRoutes);

module.exports = (port = PORT) => {
  app.listen(port, (err) => {
    if (err) {
      return console.error(`Server creation error`, err);
    }
    return console.info(chalk.green(`Waiting for connections on ${port}`));
  });
};
