"use strict";

const {checkSchema} = require(`express-validator`);

module.exports = checkSchema({
  title: {
    isLength: {
      errorMessage: `Title must be at least 10 characters but no longer than 100`,
      options: {
        min: 10,
        max: 100,
      },
    },
  },
  description: {
    isLength: {
      errorMessage: `Description must be at least 10 characters but no longer than 100`, options: {
        min: 50,
        max: 1000,
      },
    },
  },
  picture: {
    notEmpty: {
      // eslint-disable-next-line camelcase
      ignore_whitespace: false,
    },
  },
  category: {
    isArray: {
      errorMessage: `category should be at least 1 word`,
      options: {min: 1},
    },
  },
  type: {
    notEmpty: {
      // eslint-disable-next-line camelcase
      ignore_whitespace: false,
    },
    custom: {
      errorMessage: `Should be one of Куплю or Продам`,
      options: (input) => {
        const types = [`Куплю`, `Продам`];

        return types.includes(input);
      },
    },
  },
  sum: {
    isInt: {
      options: {
        min: 10,
      },
    },
  },
});
