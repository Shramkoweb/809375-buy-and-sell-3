"use strict";

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  _findIndexByID(offer, commentId) {
    return offer.comments.findIndex((comment) => comment.id === commentId);
  }

  create(offer, comment) {
    const newComment = {...comment, id: nanoid(MAX_ID_LENGTH)};

    offer.comments.push(newComment);

    return newComment;
  }

  delete(offer, commentId) {
    return offer.comments.splice(this._findIndexByID(offer, commentId), 1);
  }

  findAll(offer) {
    return offer.comments;
  }

  findByID(offer, commentId) {
    const searchCommentIndex = this._findIndexByID(offer, commentId);

    if (searchCommentIndex === -1) {
      return null;
    }

    return offer.comments[searchCommentIndex];
  }
}

module.exports = CommentService;
