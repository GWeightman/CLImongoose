require("./db/connections")
const yargs = require("yargs")
const mongoose = require("mongoose")
const { addMovie, deleteMovie, listMovie, editMovie, findMovie } = require("./movie/movie.functions")

const app = async (args) => {
    try {
        if (args.addmovie) { /*--addmovie --title "title" --actor "actor" --rating "No."*/
            const movieObj = {title: args.title, actor: args.actor, rating: args.rating}
            await addMovie(movieObj)
        }
        else if (args.deletemovie){ /*--deletemovie --title "title"*/
            const movieObj = {title: args.title}
            await deleteMovie(movieObj)
        }
        else if (args.movie){ /*--movie*/
            await listMovie()
        }
        else if (args.editmovie){
            if (args.title){ /* --editmovie --title "title" --set "newtitle" */
                const newObj = {$set: { title: args.set }}
                const movieObj = { title: args.title } 
                await editMovie (movieObj, newObj)
            }
            else if (args.actor){ /* --editmovie --actor "actor" --set "newactor" */
                const newObj = {$set: { actor: args.set }}
                const movieObj = { actor: args.actor }
                await editMovie (movieObj, newObj)
            }
            else if (args.ratingof){ /* --editmovie --ratingof "title" --set "ratingNo." */
                const newObj = {$set: { rating: args.set }}
                const movieObj = { title: args.ratingof }
                await editMovie (movieObj, newObj)
            }
        }
        else if (args.findmovie){
            if (args.title){
                const movieObj = {title: args.title}
                await findMovie (movieObj)
            }
            else if (args.actor){
                const movieObj = {actor: args.actor}
                await findMovie (movieObj)
            }
            else if (args.rating){
                const movieObj = {rating: args.rating}
                await findMovie (movieObj)
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