'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Expert = mongoose.model('Expert'),
  Thread = mongoose.model('Thread'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current expert
 */
exports.read = function (req, res) {
  res.json(req.expert);
};

/**
 * Update an Expert
 */
exports.update = function (req, res) {
  var expert = req.expert;

  // For security purposes only merge these parameters
  expert.description = req.body.description;

  expert.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(expert);
  });
};

/**
 * List of Experts
 */
exports.list = function (req, res) {
  Expert.find().populate('user', 'displayName profileImageURL').exec(function (err, experts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(experts);
  });
};

/**
 * To get a particular chat room of an expert
 * @param req
 * @param res
 */
exports.getChatRoom = function (req, res) {
  Expert.findOne({ user: req.user._id }).exec(function (err, expert) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!expert) {
      return res.status(404).send({
        message: 'No Expert with that identifier has been found'
      });
    }

    Thread.findOne({ expert: expert._id, user: req.model._id }).exec(function (err, thread) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else if (!thread) {
        return res.status(404).send({
          message: 'No Chat Room with that name has been found'
        });
      }

      res.json(thread);
    });
  });
};

/**
 * To get all chat rooms of an expert
 * @param req
 * @param res
 */
exports.getAllChatRooms = function (req, res) {
  Expert.findOne({ user: req.user._id }).exec(function (err, expert) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!expert) {
      return res.status(404).send({
        message: 'No Expert with that identifier has been found'
      });
    }

    Thread.find({ expert: expert._id }).populate([{
      path: 'user',
      select: '-salt -password'
    }, 'expert']).exec(function (err, threads) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else if (threads.length === 0) {
        return res.status(404).send({
          message: 'No Chat Rooms have been found'
        });
      }

      res.json(threads);
    });
  });
};

/**
 * Expert middleware
 */
exports.expertByUserID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Expert is invalid'
    });
  }

  Expert.findOne({ user: id }).populate('user', '-salt -password').exec(function (err, expert) {
    if (err) {
      return next(err);
    } else if (!expert) {
      return next(new Error('Failed to load expert ' + id));
    }

    req.expert = expert;
    next();
  });
};

exports.getExpert = function (req, res, next) {
  Expert.findOne({ user: req.user.id }).populate('user', '-salt -password').exec(function (err, expert) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!expert) {
      return res.status(404).send({
        message: 'User not an expert'
      });
    }

    req.expert = expert;
    next();
  });
};
