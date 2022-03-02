const mongoose = require("mongoose")

// const userSchema = mongoose.Schema({
//   email: String,
//   username: String,
//   password: String,
// });

const reqString = {
    type: String,
    required: true,
}

const userSchema = mongoose.Schema({
    email: reqString,
    username: reqString,
    password: reqString,
})

module.exports = mongoose.model("users", userSchema)
