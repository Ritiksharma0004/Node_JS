const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save',async function (next) {
  const person = this;
 // Hash password only if it has been modified
 if(!person.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password

    const hashedPassword = await bcrypt.hash(person.password, salt);

    person.password = hashedPassword;

    next();
  } catch (error) {
    return next(err);
  }
}) 

personSchema.methods.comparePassword = async function (cnadidatePassword) {

  try {
    const isMatch = await bcrypt.compare(cnadidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw errror;
  }
  
}

const Person = mongoose.model('Person',personSchema);

module.exports = Person;