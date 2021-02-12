"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const route = new Router();

module.exports = (service) => {
  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(StatusCodes.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = service.findAll(query);
    const responseStatus = searchResults.length > 0 ? StatusCodes.OK : StatusCodes.NOT_FOUND;

    res.status(responseStatus).json(searchResults);
  });

  return route;
};
