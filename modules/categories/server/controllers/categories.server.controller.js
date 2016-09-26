'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
  Material = mongoose.model('Material'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a new category
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  var category = new Category(req.body);

  category.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * Get the category
 * @param req
 * @param res
 */
exports.read = function (req, res) {
  // Convert mongoose document to json
  var category = req.category ? req.category.toJSON() : {};

  res.json(category);
};

exports.materialList = function (req, res) {
  var category = req.category;

  Material.find({ category: category._id }).exec(function (err, materials) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!materials) {
      materials = [];
    }

    res.json(materials);
  });
};

/**
 * Update the category
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  var category = req.category;

  category.description = req.body.description ? req.body.description : category.description;
  category.price = req.body.price ? req.body.price : category.price;

  category.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};


/**
 * Delete a category
 */
exports.delete = function (req, res) {
  var category = req.category;

  category.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};


/**
 * List of Categories
 */
exports.list = function (req, res) {
  Category.find().sort('created').exec(function (err, categories) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categories);
    }
  });
};

exports.categoryByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Category is invalid'
    });
  }

  Category.findById(id).exec(function (err, category) {
    if (err) {
      return next(err);
    } else if (!category) {
      return res.status(404).send({
        message: 'No category with that identifier has been found'
      });
    }
    req.category = category;
    next();
  });
};
