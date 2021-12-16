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

exports.listMovie = async () => {
    try{
        const listmovie = await Movie.find()
        listmovie.forEach((element) => {
            console.log(`${element.title} ${element.actor} ${element.rating}`)
        })
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}