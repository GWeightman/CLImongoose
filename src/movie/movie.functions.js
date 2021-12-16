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
            console.table([{ title: element.title, actor: element.actor, rating: element.rating }])
        })
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}

exports.editMovie = async (movieObj, newObj) => {
    try{
        await Movie.updateOne(movieObj, newObj)
        if (movieObj.actor){
            console.log(`Successfully changed ${movieObj.actor} to ${newObj.$set.actor}`)
        }
        else if (newObj.$set.rating){
            console.log(`Successfully changed the rating of ${movieObj.title} to ${newObj.$set.rating}`)
        }
        else if (movieObj.title){
            console.log(`Successfully changed ${movieObj.title} to ${newObj.$set.title}`)
        }
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}