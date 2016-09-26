(function (app) {
  'use strict';

  app.registerModule('training', ['underscore', 'core']);
  app.registerModule('training.services');
  app.registerModule('training.routes', ['ui.router', 'core.routes', 'categories.services', 'training.services']);
}(ApplicationConfiguration));
