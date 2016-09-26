'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User-Courses Schema
 */
var UserCourseSchema = new Schema({
  months: {
    type: Number,
    enum: [1, 3, 6],
    required: 'Course Duration is required'
  },
  categories: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Current user is required'
  },
  cost: {
    type: Number,
    required: 'Cost is required'
  },
  paymentConfirm: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date
  }
});

mongoose.model('UserCourse', UserCourseSchema);
