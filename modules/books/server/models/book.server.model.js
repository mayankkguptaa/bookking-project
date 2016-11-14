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
  publishedYear: {
    type: Number,
    trim: true,
    required: 'Publishing Year of Book is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  profileImageURL: {
    type: String,
    default: 'modules/books/client/img/default.png'
  },
  price: {
    type: Number,
    trim: true,
    required: 'Price is required'
  },
  created: {
    type: Date,
    default: Date.now()
  },
  givenByUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Current user is required'
  }
});

mongoose.model('Book', BookSchema);
