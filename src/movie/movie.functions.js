const Movie = require("./movie.model")
const mongoose = require("mongoose")

exports.addMovie = async (movieObj) => {
    try{
        const newMovie = new Movie(movieObj)
        await newMovie.save()
        console.log(`Successfully added ${movieObj.title}`)
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}

exports.deleteMovie = async (movieObj) => {
    try{
        await Movie.deleteOne(movieObj)
        console.log(`Successfully deleted ${movieObj.title}`)
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}