"use strict";

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.reduce((acc, currentOffer) => {
      return acc.add(...currentOffer.category);
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
