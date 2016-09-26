'use strict';

/**
 * Module dependencies
 */
var categoriesPolicy = require('../policies/categories.server.policy'),
  materials = require('../controllers/materials.server.controller');

module.exports = function (app) {
  // Single article routes
  app.route('/api/materials/:materialId').all(categoriesPolicy.isAllowed)
    .get(materials.read)
    .post(materials.addContent)
    .delete(materials.deleteContent);

  // Finish by binding the material middleware
  app.param('materialId', materials.materialByID);
};
