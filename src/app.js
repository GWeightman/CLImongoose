require("./db/connections")
const yargs = require("yargs")
const mongoose = require("mongoose")
const { addMovie, deleteMovie, listMovie, editMovie, findMovie } = require("./movie/movie.functions")
const { addBook, deleteBook, listBook, editBook, findBook } = require("./books/book.functions")

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
            if (args.title){ /* --findmovie --title "title" */
                const movieObj = {title: args.title}
                await findMovie (movieObj)
            }
            else if (args.actor){ /* --findmovie --actor "actor" */
                const movieObj = {actor: args.actor}
                await findMovie (movieObj)
            }
            else if (args.rating){ /* --findmovie --rating "rating" */
                const movieObj = {rating: args.rating}
                await findMovie (movieObj)
            }
        } /** 2nd model Books */
        else if (args.addbook) { /*--addbook --title "title" --author "author" --year "No."*/
        const bookObj = {title: args.title, author: args.author, year: args.year}
        await addBook(bookObj)
        }
        else if (args.deletebook){ /*--deletebook --title "title"*/
            const bookObj = {title: args.title}
            await deleteBook(bookObj)
        }
        else if (args.book){ /*--book*/
            await listBook()
        }
        else if (args.editbook){
            if (args.title){ /* --editbook --title "title" --set "newtitle" */
                const newObj = {$set: { title: args.set }}
                const bookObj = { title: args.title } 
                await editBook (bookObj, newObj)
            }
            else if (args.author){ /* --editbook --author "author" --set "newauthor" */
                const newObj = {$set: { author: args.set }}
                const bookObj = { author: args.author }
                await editBook (bookObj, newObj)
            }
            else if (args.yearof){ /* --editbook --yearof "title" --set "year" */
                const newObj = {$set: { year: args.set }}
                const bookObj = { title: args.yearof }
                await editBook (bookObj, newObj)
            }
        }
        else if (args.findbook){
            if (args.title){ /* --findbook --title "title" */
                const bookObj = {title: args.title}
                await findBook (bookObj)
            }
            else if (args.author){ /* --findbook --author "author" */
                const bookObj = {author: args.author}
                await findBook (bookObj)
            }
            else if (args.year){ /* --findbook --year "year" */
                const bookObj = {year: args.year}
                await findBook (bookObj)
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