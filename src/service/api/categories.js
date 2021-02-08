"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(StatusCodes.OK)
      .json(categories);
  });
};
