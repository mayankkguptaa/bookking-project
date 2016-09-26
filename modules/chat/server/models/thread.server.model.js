'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Thread Schema
 */
var ThreadSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  roomName: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  expert: {
    type: Schema.ObjectId,
    ref: 'Expert'
  }
});

mongoose.model('Thread', ThreadSchema);
