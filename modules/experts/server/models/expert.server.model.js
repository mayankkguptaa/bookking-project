'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Expert Schema
 */
var ExpertSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    default: ''
  }
});

mongoose.model('Expert', ExpertSchema);
