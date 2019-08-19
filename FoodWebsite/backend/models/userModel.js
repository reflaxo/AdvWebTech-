const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  image: { data: Buffer, contentType: String },
  favorites: { type: String, max: 1000 },
  password: {
    type: String,
    required: true
  },
  email: { type: String, unique: true, required: false, default: null },
  title: { type: String, required: false, default: null },
  isActive: { type: Boolean, default: true },
  session: { type: Boolean, default: false }
});

// Define schema methods
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
UserSchema.pre("save", function(next) {
  if (!this.password) {
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

module.exports = User = mongoose.model("User", UserSchema);
