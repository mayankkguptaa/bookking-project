(function (app) {
  'use strict';

  app.registerModule('core');
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.admin', ['core']);
  app.registerModule('core.admin.routes', ['ui.router']);
  app.registerModule('core.experts', ['core']);
  app.registerModule('core.experts.routes', ['ui.router']);
}(ApplicationConfiguration));