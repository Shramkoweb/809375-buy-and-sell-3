"use strict";

const {checkSchema} = require(`express-validator`);

module.exports = checkSchema({
  text: {
    isLength: {
      errorMessage: `text must be at least 10 characters but no longer than 100`,
      options: {
        min: 10,
        max: 100,
      },
    },
  },
});
