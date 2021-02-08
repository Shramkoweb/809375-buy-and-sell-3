"use strict";

class SerchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchQuery) {
    return this._offers.filter((offer) => offer.title.includes(searchQuery));
  }
}

module.exports = SerchService;
