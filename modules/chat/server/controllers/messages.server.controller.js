'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  Thread = mongoose.model('Thread'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a message
 */
exports.create = function (req, res) {
  var thread = req.thread;
  var message = new Message();
  message.content = req.body.content;
  message.thread = thread;
  message.sender = req.user;

  message.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(message);
    }
  });
};

/**
 * List of Messages
 */
exports.list = function (req, res) {
  Message.find({ thread: req.thread.id }).sort('-created').populate('sender').exec(function (err, messages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(messages);
    }
  });
};

exports.createChatRoom = function (req, res) {
  Thread.findOne({ expert: req.expert._id, user: req.user._id }).exec(function (err, thread) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    if (!thread) {
      thread = new Thread();
      thread.expert = req.expert;
      thread.user = req.user;
      thread.roomName = req.expert.user.username + req.user.username;
      thread.save();
    }

    res.json(thread);
  });
};

exports.threadByName = function (req, res, next, name) {
  Thread.findOne({ roomName: name }).populate(['user', 'expert']).exec(function (err, thread) {
    if (err) {
      next(err);
    } else if (!thread) {
      return res.status(404).send({
        message: 'No Chat Room with that name has been found'
      });
    }

    req.thread = thread;
    next();
  });
};
