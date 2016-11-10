'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  Testimonial = mongoose.model('Testimonial'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Render the main application page
 */
exports.create = function (req, res) {
  var testimonial = new Testimonial();
  testimonial.user = req.user._id;
  testimonial.data = req.body.data;
  testimonial.updated = Date.now();

  if (testimonial.data) {
    testimonial.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(testimonial);
      }
    });
  } else {
    return res.status(400).send({
      message: 'Testimonial save Failed!!'
    });
  }
};

exports.read = function (req, res) {
  // Convert mongoose document to json
  var testimonial = req.testimonial ? req.testimonial.toJSON() : {};
  res.json(testimonial);
};

exports.list = function (req, res) {
  Testimonial.find({ user: req.user._id }).sort('-created').populate('user data').exec(function (err, testimonial) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testimonial);
    }
  });
};

exports.update = function (req, res) {
  var testimonial = req.testimonial;

  testimonial.data = req.body.data;

  testimonial.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testimonial);
    }
  });
};

exports.delete = function (req, res) {
  var testimonial = req.testimonial;

  testimonial.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testimonial);
    }
  });
};

/**
 * Get the user-course by id
 * @param req
 * @param res
 * @param next
 * @param id
 * @returns {*}
 */

exports.renderIndex = function (req, res) {

  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      mobile: req.user.mobile,
      dob: req.user.dob,
      gender: req.user.gender,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: safeUserObject
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
