(function (app) {
  'use strict';

  app.registerModule('books', ['core']);
  app.registerModule('books.services');
  app.registerModule('books.routes', ['ui.router', 'core.routes', 'books.services']);
}(ApplicationConfiguration));
