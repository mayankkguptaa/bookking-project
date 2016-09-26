'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  experts = require(path.resolve('./modules/experts/server/controllers/experts.server.controller.js')),
  messages = require('../controllers/messages.server.controller');

module.exports = function (app) {
  // Messages collection routes
  app.route('/api/chat/messages/:roomName').get(messages.list)
    .post(messages.create);

  // Create a chat room by user for an expert or get a chat room by user for an expert
  app.route('/api/chat/experts/:expertUserId').get(messages.createChatRoom);

  // Finish by binding the expert middleware
  app.param('expertUserId', experts.expertByUserID);

  // Finish by binding the thread middleware
  app.param('roomName', messages.threadByName);
};
