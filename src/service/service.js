"use strict";

const commander = require(`commander`);
const chalk = require(`chalk`);

const packageJsonFile = require(`../../package.json`);
const generateOffers = require(`./cli/generate`);
const serverCLI = require(`./cli/server`);

const OFFERS_DEFAULT_COUNT = 1;
const OFFERS_MAX_COUNT = 1000;

const handleServerAction = (value) => {
  if (typeof value === `boolean`) {
    serverCLI();
  } else {
    serverCLI(parseInt(value, 10));
  }
};

const handleGenerateAction = (value) => {
  const count = parseInt(value, 10);

  if (count > OFFERS_MAX_COUNT) {
    console.info(chalk.blue(`Не больше 1000 объявлений`));
    process.exit(1);
  }

  if (typeof value === `boolean`) {
    generateOffers(OFFERS_DEFAULT_COUNT);
  } else {
    generateOffers(count);
  }
};

commander
  .version(packageJsonFile.version, `-v, --version`)
  .option(`-g, --generate [count]`, `generates mocks.json files`)
  .option(`-s, --server [port]`, `create server on specific port`)
  .action(({generate, server}) => {
    if (process.argv.length === 2) {
      commander.help();
    }

    if (server) {
      handleServerAction(server);
    }

    if (generate) {
      handleGenerateAction(generate);
    }
  })
  .parse();
