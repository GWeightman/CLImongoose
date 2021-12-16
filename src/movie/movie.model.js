const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },

    actor: {
        type: String,
        default: "Not Specified"
    },

    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    }
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie