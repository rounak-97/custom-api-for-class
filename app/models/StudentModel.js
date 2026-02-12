const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    age: {
      type: Number,
      required: true
    },

    course: {
      type: String,
      required: true,
      trim: true
    },

    // Ownership: which user created this student
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema)
