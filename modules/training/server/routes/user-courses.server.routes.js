'use strict';

/**
 * Module Dependencies
 * @type {*|!Object}
 */
var userCoursePolicy = require('../policies/user-course.server.policy.js'),
  userCourse = require('../controllers/user-course.server.controller.js');

module.exports = function (app) {
  app.route('/api/courses').all(userCoursePolicy.isAllowed)
    .get(userCourse.list)
    .post(userCourse.create);

  app.route('/api/courses/:userCourseId').all(userCoursePolicy.isAllowed)
    .get(userCourse.read)
    .put(userCourse.update)
    .delete(userCourse.delete);

  app.param('userCourseId', userCourse.userCourseByID);
};
