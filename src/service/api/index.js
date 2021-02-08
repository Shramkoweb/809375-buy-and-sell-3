"use strict";

const {Router} = require(`express`);
const categories = require(`../api/categories`);

const MockDataService = require(`../lib/mock-data-service`);

const {
  CategoryService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const dataService = new MockDataService();
  const mockData = await dataService.getData();

  categories(app, new CategoryService(mockData));
})();

module.exports = app;
