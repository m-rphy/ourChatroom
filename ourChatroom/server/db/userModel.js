const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 12;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  messages: []
});

// The pre() method should be called on the Mongoose schema 
// before creating the model!!

userSchema.pre('save', async function (next) {
  
  try {
    if (!this.isModified('password')) {
      return next();
    }
    // generates a random salt value that is used to hash a password
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model('User', userSchema);