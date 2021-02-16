"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const route = new Router();

module.exports = (searchService) => {
  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res.status(StatusCodes.BAD_REQUEST).json([]);
    }

    const searchResults = searchService.findAll(query);

    return res.status(StatusCodes.OK).json(searchResults);
  });

  return route;
};
