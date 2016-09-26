(function (app) {
  'use strict';

  app.registerModule('experts', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('experts.services');
  app.registerModule('experts.chat.routes', ['ui.router', 'core.routes', 'experts.services']);
  app.registerModule('experts.profile.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
