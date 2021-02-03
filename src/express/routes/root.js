"use strict";

const {Router} = require(`express`);

const rootRouter = new Router();

rootRouter.get(`/`, (req, res) => {
  res.render(`main`);
});
rootRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});
rootRouter.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});
rootRouter.get(`/search`, (req, res) => {
  res.render(`search`);
});

module.exports = rootRouter;
