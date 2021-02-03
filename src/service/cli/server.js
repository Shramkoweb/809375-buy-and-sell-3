"use strict";

const chalk = require(`chalk`);
const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`).promises;

const FILE_NAME = path.resolve(__dirname, `../../..`, `mocks.json`);
const PORT = 3000;

const app = express();

app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf8`);
    const mocks = JSON.parse(fileContent);

    res.send(mocks);
  } catch (error) {
    res.send(JSON.parse([]));
    console.log(error);
  }
});

module.exports = (port = PORT) => {
  app.listen(port, (err) => {
    if (err) {
      return console.error(`Server creation error`, err);
    }
    return console.info(chalk.green(`Waiting for connections on ${port}`));
  });
};
