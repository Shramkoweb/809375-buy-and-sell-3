"use strict";

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;

const {
  MAX_ID_LENGTH,
} = require(`./constants`);

const getRandomInt = (min, max) => {
  const minimal = Math.ceil(min);
  const maximal = Math.floor(max);

  return Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
};

const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomPosition]] = [shuffledArray[randomPosition], shuffledArray[i]];
  }

  return shuffledArray;
};

const generatePictureFileName = (maxPicturesCount) => {
  return maxPicturesCount > 10
    ? `item${maxPicturesCount}`
    : `item0${maxPicturesCount}`;
};

const removeBlankLines = (string) => string.trim().split(`\n`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return removeBlankLines(content);
  } catch (err) {
    return console.error(chalk.red(err));
  }
};

const generateCommentsFrom = (array, count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    const comment = {
      id: nanoid(MAX_ID_LENGTH),
      text: getRandomItemFrom(array),
    };

    comments.push(comment);
  }

  return comments;
};

module.exports = {
  getRandomInt,
  getRandomItemFrom,
  shuffleArray,
  generatePictureFileName,
  readContent,
  removeBlankLines,
  generateCommentsFrom,
};
