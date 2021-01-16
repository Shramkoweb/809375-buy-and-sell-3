"use strict";

const commander = require(`commander`);

const packageJsonFile = require(`../../package.json`);
const generateOffers = require(`./cli/generate`);

commander
  .version(packageJsonFile.version, `-v, --version`)
  .option(`-g, --generate [count]`, `generates mocks.json files`, `1`)
  .action(({generate}) => {
    if (process.argv.length === 2) {
      commander.help();
    }

    const count = parseInt(generate, 10);

    if (count > 1000) {
      console.log(`Не больше 1000 объявлений`);
      process.exit(1);
    }

    generateOffers(count);
  })
  .parse(process.argv);
