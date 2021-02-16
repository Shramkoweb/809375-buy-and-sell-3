"use strict";

const {Router} = require(`express`);
const categoriesRoute = require(`../api/categories`);
const searchRoute = require(`../api/search`);
const offersRoute = require(`../api/offers`);

const MockDataService = require(`../lib/mock-data-service`);

const {
  CategoryService,
  CommentService,
  OfferService,
  SearchService,
} = require(`../data-service`);

module.exports = async () => {
  console.log(`123123`);
  const route = new Router();
  const dataService = new MockDataService();
  const mockData = await dataService.getData();

  route.use(`/categories`, categoriesRoute(new CategoryService(mockData)));
  route.use(`/search`, searchRoute(new SearchService(mockData)));
  route.use(`/offers`, offersRoute(new OfferService(mockData), new CommentService(mockData)));

  return route;
};
