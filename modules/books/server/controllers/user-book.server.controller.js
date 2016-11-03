'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  UserBook = mongoose.model('UserBook'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a new course for the user
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  var userBook = new UserBook();
  userBook.user = req.user._id;
  userBook.months = req.body.months;
  userBook.categories = req.body.categories;
  userBook.cost = req.body.cost;
  userBook.updated = Date.now();

  if (userBook.categories) {
    userBook.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(userBook);
      }
    });
  } else {
    return res.status(400).send({
      message: 'No Books selected'
    });
  }
};

/**
 * Get the user book for an id
 * @param req
 * @param res
 */
exports.read = function (req, res) {
  // Convert mongoose document to json
  var userBook = req.userBook ? req.userBook.toJSON() : {};

  userBook.isCurrentUserOwner = !!(req.user && userBook.user && userBook.user._id.toString() === req.user._id.toString());
  res.json(userBook);
};

/**
 * List all the user Books
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  UserBook.find({ user: req.user._id }).sort('-created').populate('user books').exec(function (err, userBooks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userBooks);
    }
  });
};

exports.update = function (req, res) {
  var userBooks = req.userBooks;

  userBooks.paymentConfirm = req.body.paymentConfirm;

  userBooks.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userBooks);
    }
  });
};

exports.delete = function (req, res) {
  var userBooks = req.userBooks;

  userBooks.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userBooks);
    }
  });
};

/**
 * Get the user-book by id
 * @param req
 * @param res
 * @param next
 * @param id
 * @returns {*}
 */
exports.userBookByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'UserBook is invalid'
    });
  }

  UserBook.findById(id).populate('user books').exec(function (err, userBook) {
    if (err) {
      return next(err);
    } else if (!userBook) {
      return res.status(404).send({
        message: 'No book with that identifier has been found'
      });
    }
    req.userBook = userBook;
    next();
  });
};
