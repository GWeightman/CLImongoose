require("./db/connections")
const yargs = require("yargs")
const mongoose = require("mongoose")
const { addMovie, deleteMovie } = require("./movie/movie.functions")

const app = async (args) => {
    try {
        if (args.add) {
            const movieObj = {title: args.title, actor: args.actor, rating: args.rating}
            await addMovie(movieObj)
        }
        else if (args.delete){
            const movieObj = {title: args.title}
            await deleteMovie(movieObj)
        }
        else{
            console.log("Incorrect command")
            mongoose.disconnect()
        }
    } catch (error) {
        console.log(error)
        mongoose.disconnect()
    }
}

app (yargs.argv)