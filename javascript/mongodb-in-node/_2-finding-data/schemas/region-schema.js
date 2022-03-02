const mongoose = require("mongoose")

const reqString = {
    type: String,
    required: true,
}

const reqNumber = {
    type: Number,
    required: true,
}

const reqBoolean = {
    type: Boolean,
    required: true,
}

const regionSchema = mongoose.Schema({
    name: reqString,
    age: reqNumber,
    isHospitable: reqBoolean,
})

// const regionSchema = mongoose.Schema({
//     name: String,
//     age: Number,
//     isHospitable: Boolean,
// })

module.exports = mongoose.model("regions", regionSchema)
