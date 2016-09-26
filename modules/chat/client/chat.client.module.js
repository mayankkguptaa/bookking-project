(function (app) {
  'use strict';

  app.registerModule('chat', ['core']);
  app.registerModule('chat.services');
  app.registerModule('chat.routes', ['ui.router', 'core.routes', 'chat.services']);
}(ApplicationConfiguration));
