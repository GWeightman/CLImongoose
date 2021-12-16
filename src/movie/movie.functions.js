const Movie = require("./movie.model")
const mongoose = require("mongoose")

exports.addMovie = async (movieObj) => {
    try{
        const newMovie = new Movie(movieObj)
        await newMovie.save()
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}