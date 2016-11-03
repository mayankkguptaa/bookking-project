'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Category Schema
 */
var BookSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Name of the book is required'
  },
  author: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Author of the book is required'
  },
  edition: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Edition of the book is required'
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
