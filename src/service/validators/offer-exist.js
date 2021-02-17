"use strict";

const {ReasonPhrases} = require(`http-status-codes`);
const {StatusCodes} = require(`http-status-codes`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;

  const offer = service.findByID(offerId);
  if (offer) {
    res.locals.offer = offer;
    next();
  } else {
    res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  }
};
