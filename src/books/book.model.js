const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },

    author: {
        type: String,
        default: "Not Specified"
    },

    year: {
        type: Number,
        default: "Not Specified"
    }
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book