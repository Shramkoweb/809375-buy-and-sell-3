"use strict";

const {ReasonPhrases, StatusCodes} = require(`http-status-codes`);

module.exports = (commentService) => (req, res, next) => {
  const {commentId} = req.params;
  const {offer} = res.locals;

  const comment = commentService.findByID(offer, commentId);
  if (comment) {
    res.locals.comment = comment;
    next();
  } else {
    res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  }
};
