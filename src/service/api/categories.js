"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const route = new Router();

module.exports = (categoryService) => {
  route.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(StatusCodes.OK)
      .json(categories);
  });

  return route;
};
