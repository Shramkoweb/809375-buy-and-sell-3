"use strict";

const {Router} = require(`express`);
const categories = require(`../api/categories`);
const search = require(`../api/search`);

const MockDataService = require(`../lib/mock-data-service`);

const {
  CategoryService,
  SearchService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const dataService = new MockDataService();
  const mockData = await dataService.getData();

  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
