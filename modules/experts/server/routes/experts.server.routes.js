'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  expertsPolicy = require('../policies/experts.server.policy'),
  expert = require('../controllers/experts.server.controller'),
  admin = require(path.resolve('./modules/users/server/controllers/admin.server.controller'));

module.exports = function (app) {
  // Experts collection routes
  app.route('/api/experts')
    .get(expertsPolicy.isAllowed, expert.list);

  // Single expert routes
  app.route('/api/experts/me').all(expert.getExpert)
    .get(expertsPolicy.isAllowed, expert.read)
    .put(expertsPolicy.isAllowed, expert.update);

  app.route('/api/chat/users').get(expert.getAllChatRooms);

  app.route('/api/chat/users/:userId').get(expert.getChatRoom);

  // Finish by binding a middleware to find the user by id
  app.param('userId', admin.userByID);
};
