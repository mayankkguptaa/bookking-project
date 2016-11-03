'use strict';

/**
 * Module dependencies
 */
var booksPolicy = require('../policies/books.server.policy.js'),
  books = require('../controllers/books.server.controller.js');

module.exports = function (app) {
  // Books collection routes
  app.route('/api/books').all(booksPolicy.isAllowed)
    .get(books.list)
    .post(books.create);

  // Single article routes
  app.route('/api/books/:bookId').all(booksPolicy.isAllowed)
    .get(books.read)
    .put(books.update)
    .delete(books.delete);

  // Finish by binding the article middleware
  app.param('bookId', books.bookByID);
};
