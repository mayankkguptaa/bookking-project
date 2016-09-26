'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContentSchema = new Schema({
  type: {
    type: String,
    enum: ['video', 'doc']
  },
  body: String,
  created: {
    type: Date,
    default: Date.now()
  }
});

/**
 * Material Schema
 */
var MaterialSchema = new Schema({
  day: {
    type: Number
  },
  contents: [ContentSchema],
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  }
});

mongoose.model('Material', MaterialSchema);
