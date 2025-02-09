const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');  // For password hashing


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure the email is unique
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']  // Email format validation
  },
  password: { 
    type: String, 
    required: true,
    minlength: [5, 'Password must be at least 5 characters long'] // Minimum length validation
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
