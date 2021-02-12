"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);
const {validationResult} = require(`express-validator`);

const offerCreateValidator = require(`../validators/offer-create`);
const offerExistValidator = require(`../validators/offer-exist`);
const commentExistValidator = require(`../validators/comment-exist`);
const commentValidator = require(`../validators/comment-validator`);

const route = new Router();

module.exports = (offerService, commentService) => {
  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();

    return res.status(StatusCodes.OK).json(offers);
  });

  route.post(`/`, offerCreateValidator, ((req, res) => {
    const {errors} = validationResult(req);

    if (errors.length === 0) {
      const offer = offerService.create(req.body);
      return res.status(StatusCodes.OK).json(offer);
    }

    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }));

  route.put(`/:offerId`, offerExistValidator(offerService), offerCreateValidator, ((req, res) => {
    const {errors} = validationResult(req);
    const {offerId} = req.params;

    if (errors.length === 0) {
      const offer = offerService.update(offerId, req.body);

      return res.status(StatusCodes.OK).json(offer);
    }
    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }));

  route.delete(`/:offerId`, offerExistValidator(offerService), ((req, res) => {
    const {offerId} = req.params;

    const deletedOffer = offerService.delete(offerId);

    res.status(StatusCodes.OK).json(deletedOffer);
  }));

  route.get(`/:offerId`, offerExistValidator(offerService), ((req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findByID(offerId);

    res.status(StatusCodes.OK).json(offer);
  }));

  route.get(`/:offerId/comments`, offerExistValidator(offerService), ((req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findByID(offerId);
    const comments = commentService.findAll(offer);

    res.status(StatusCodes.OK).json(comments);
  }));

  route.delete(`/:offerId/comments/:commentId`, offerExistValidator(offerService), commentExistValidator(commentService), (req, res) => {
    const {offerId, commentId} = req.params;
    const offer = offerService.findByID(offerId);

    const deletedComment = commentService.delete(offer, commentId);

    res.status(StatusCodes.OK).send(deletedComment);
  });

  route.post(`/:offerId/comments/`, offerExistValidator(offerService), commentValidator, (req, res) => {
    const {errors} = validationResult(req);
    const {offer} = res.locals;

    if (errors.length === 0) {
      const comment = commentService.create(offer, req.body);

      return res.status(StatusCodes.OK).json(comment);
    }
    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  });

  return route;
};
