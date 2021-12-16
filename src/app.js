require("./db/connections")
const yargs = require("yargs")
const mongoose = require("mongoose")
const { addMovie, deleteMovie, listMovie, editMovie } = require("./movie/movie.functions")

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
        else if (args.movie){
            await listMovie()
        }
        else if (args.edit){
            if (args.title){
                const newObj = {$set: { title: args.set }}
                const movieObj = { title: args.title } 
                await editMovie (movieObj, newObj)
            }
            else if (args.actor){
                const newObj = {$set: { actor: args.set }}
                const movieObj = { actor: args.actor }
                await editMovie (movieObj, newObj)
            }
            else if (args.ratingof){
                const newObj = {$set: { rating: args.set }}
                const movieObj = { title: args.ratingof }
                await editMovie (movieObj, newObj)
            }
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