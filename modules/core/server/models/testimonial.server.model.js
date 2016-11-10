'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Testimonial Schema
 */
var TestimonialSchema = new Schema({
  data: {
    type: String,
    trim: true,
    default: '',
    required: 'Please fill in the testimonial'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Current user is required'
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date
  }

});

mongoose.model('Testimonial', TestimonialSchema);
