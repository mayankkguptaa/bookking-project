'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Book = mongoose.model('Book'),
  User = mongoose.model('User');

/**
 * Create a new book
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  var book = new Book(req.body);

  book.givenByUser = req.user._id;

  book.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * Get the book
 * @param req
 * @param res
 */
exports.read = function (req, res) {
  // Convert mongoose document to json
  var book = req.book ? req.book.toJSON() : {};

  res.json(book);
};
/**
 * Update the book
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  var book = req.book;

  book.title = req.body.title ? req.body.title : book.title;
  book.author = req.body.author ? req.body.author : book.author;
  book.edition = req.body.edition ? req.body.edition : book.edition;
  book.publishedYear = req.body.publishedYear ? req.body.publishedYear : book.publishedYear;
  book.description = req.body.description ? req.body.description : book.description;
  book.price = req.body.price ? req.body.price : book.price;

  book.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};


/**
 * Delete a book
 */
exports.delete = function (req, res) {
  var book = req.book;

  book.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};


/**
 * List of Books
 */
exports.list = function (req, res) {
  Book.find().sort('created').exec(function (err, books) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(books);
    }
  });
};

exports.listBookSByUser = function (req, res) {
  Book.find({ user: req.user._id }).sort('-created').populate('user title').exec(function (err, books) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(books);
    }
  });
};

exports.bookByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Book is invalid'
    });
  }

  Book.findById(id).exec(function (err, book) {
    if (err) {
      return next(err);
    } else if (!book) {
      return res.status(404).send({
        message: 'No book with that identifier has been found'
      });
    }
    req.book = book;
    next();
  });
};
