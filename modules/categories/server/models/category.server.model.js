'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Name of the category is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  pics: [{
    type: String
  }],
  price: {
    type: Number,
    required: 'Price is required'
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('Category', CategorySchema);
