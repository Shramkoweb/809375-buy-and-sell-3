"use strict";

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../constants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  _findIndexByID(id) {
    return this._offers.findIndex((offer) => offer.id === id);
  }

  create(offer) {
    const newOffer = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...offer,
    };

    this._offers.push(newOffer);

    return newOffer;
  }

  findByID(id) {
    const searchOfferIndex = this._findIndexByID(id);

    if (searchOfferIndex === -1) {
      return null;
    }

    return this._offers[searchOfferIndex];
  }

  delete(id) {
    return this._offers.splice(this._findIndexByID(id), 1);
  }

  update(id, offer) {
    const index = this._findIndexByID(id);
    this._offers[index] = {...this._offers[index], ...offer};

    return this._offers[index];
  }

  findAll() {
    return this._offers || [];
  }
}

module.exports = OfferService;
