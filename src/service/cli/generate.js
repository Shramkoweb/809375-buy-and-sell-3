"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;

const {
  getRandomInt,
  getRandomItemFrom,
  generatePictureFileName,
  shuffleArray,
  readContent,
  generateCommentsFrom,
} = require(`../../utils`);

const {
  MAX_ID_LENGTH,
  MAX_COMMENTS_AMOUNT,
} = require(`../../constants`);

const ROOT_PATH = path.resolve(__dirname, `../../../`);
const FILE_SENTENCES_PATH = path.resolve(__dirname, ROOT_PATH, `data/sentences.txt`);
const FILE_TITLES_PATH = path.resolve(__dirname, ROOT_PATH, `data/titles.txt`);
const FILE_CATEGORIES_PATH = path.resolve(__dirname, ROOT_PATH, `data/categories.txt`);
const FILE_COMMENTS_PATH = path.resolve(__dirname, ROOT_PATH, `data/comments.txt`);
const FILE_NAME = path.resolve(__dirname, ROOT_PATH, `mocks.json`);

const MAX_DESCRIPTION_COUNT = 5;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureCountRestrict = {
  MIN: 1,
  MAX: 16,
};

const CategoryCountRestrict = {
  MIN: 1,
  MAX: 5,
};

const generateOffers = (count, {titles, sentences, categories, restrict, comments}) => {
  return [...Array(count)].map(() => {
    return {
      id: nanoid(MAX_ID_LENGTH),
      title: getRandomItemFrom(titles),
      picture: generatePictureFileName(getRandomInt(PictureCountRestrict.MIN, PictureCountRestrict.MAX)),
      description: shuffleArray(sentences).slice(0, MAX_DESCRIPTION_COUNT).join(` `),
      type: getRandomItemFrom(Object.values(OfferType)),
      sum: getRandomInt(restrict.MIN, restrict.MAX),
      category: Array(getRandomInt(CategoryCountRestrict.MIN, CategoryCountRestrict.MAX)).fill({}).map(() => {
        return getRandomItemFrom(categories);
      }),
      comments: generateCommentsFrom(comments, getRandomInt(0, MAX_COMMENTS_AMOUNT)),
    };
  });
};

const createMocks = async (count) => {
  const titlesContentPromise = readContent(FILE_TITLES_PATH);
  const sentencesContentPromise = readContent(FILE_SENTENCES_PATH);
  const categoriesContentPromise = readContent(FILE_CATEGORIES_PATH);
  const commentsContentPromise = readContent(FILE_COMMENTS_PATH);

  const [titles, categories, sentences, comments] = await Promise
    .all([titlesContentPromise, categoriesContentPromise, sentencesContentPromise, commentsContentPromise]);

  try {
    const offers = generateOffers(count, {
      titles,
      restrict: SumRestrict,
      categories,
      sentences,
      comments,
    });
    const content = JSON.stringify(offers);

    await fs.writeFile(FILE_NAME, content);
    console.log(chalk.green(`Success write ${count} mocks to ${FILE_NAME}`));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red(err));
  }
};

module.exports = createMocks;
