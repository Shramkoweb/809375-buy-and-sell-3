"use strict";

const path = require("path");
const chalk = require("chalk");
const fs = require(`fs`).promises;

const {
  getRandomInt,
  getRandomItemFrom,
  generatePictureFileName,
  shuffleArray,
} = require(`../../utils`);

const FILE_NAME = path.resolve(__dirname, "../../../", "mocks.json");
const MAX_DESCRIPTION_COUNT = 5;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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


const generateOffers = (count, {titles, sentences, categories, sumRestrict}) => {
  return [...Array(count)].map(() => {
    return {
      title: getRandomItemFrom(titles),
      picture: generatePictureFileName(getRandomInt(PictureCountRestrict.MIN, PictureCountRestrict.MAX)),
      description: shuffleArray(sentences).slice(0, MAX_DESCRIPTION_COUNT).join(` `),
      type: getRandomItemFrom(Object.values(OfferType)),
      sum: getRandomInt(sumRestrict.MIN, sumRestrict.MAX),
      category: Array(getRandomInt(CategoryCountRestrict.MIN, CategoryCountRestrict.MAX)).fill({}).map(() => {
        return getRandomItemFrom(categories);
      }),
    };
  });
};

const createMocks = async (count) => {
  try {
    const offers = generateOffers(parseInt(count, 10), {
      titles: TITLES,
      sumRestrict: SumRestrict,
      categories: CATEGORIES,
      sentences: SENTENCES,
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
