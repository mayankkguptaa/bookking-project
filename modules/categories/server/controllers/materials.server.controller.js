'use strict';

/**
 * Module Dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Material = mongoose.model('Material'),
  Category = mongoose.model('Category'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));

/**
 * Get a particular material
 * @param req
 * @param res
 */
exports.read = function (req, res) {
  var material = req.material;

  res.json(material);
};

/**
 * Add content to a day
 * @param req
 * @param res
 */
exports.addContent = function (req, res) {
  var material = req.material,
    content = {},
    upload = multer(config.uploads.materialUpload).single('newMaterial'),
    materialUploadFileFilter = require(path.resolve('./config/lib/multer')).materialUploadFileFilter;

  // console.log(req);

  upload.fileFilter = materialUploadFileFilter;

  if (material) {
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading file'
        });
      } else {
        console.log(req.file);
        if (req.file.mimetype === 'application/pdf') {
          content.type = 'doc';
        } else {
          content.type = 'video';
        }
        content.body = config.uploads.materialUpload.dest + req.file.filename;

        material.contents.push(content);

        material.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          }
          material.latestContent = content;
          res.json(material);
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'No material found'
    });
  }
};

/**
 * Remove material content from a day
 * @param req
 * @param res
 */
exports.deleteContent = function (req, res) {
  var material = req.material,
    contentId = req.body.contentId;

  material.content.id(contentId).remove();

  material.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(material);
  });
};

/**
 * Get material by material id
 * @param req
 * @param res
 * @param next
 * @param id
 * @returns {*}
 */
exports.materialByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Material is invalid'
    });
  }

  Material.findById(id).populate('category').exec(function (err, material) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (!material) {
      return res.status(400).send({
        message: 'No material with such id'
      });
    } else {
      req.material = material;
      next();
    }
  });
};
