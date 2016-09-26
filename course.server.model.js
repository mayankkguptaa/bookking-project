var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CourseSchema = new Schema({
  months: {
    type: Number,
    enum: [1,3,6]
  },
  price: {
    type: Number
  }
});

mongoose.model('Course', CourseSchema);
