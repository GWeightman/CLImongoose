const Book = require("./book.model")
const mongoose = require("mongoose")

exports.addBook = async (bookObj) => {
    try{
        const newBook = new Book(bookObj)
        await newBook.save()
        console.log(`Successfully added ${bookObj.title}`)
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}

exports.deleteBook = async (bookObj) => {
    try{
        await Book.deleteOne(bookObj)
        console.log(`Successfully deleted ${bookObj.title}`)
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}

exports.listBook = async () => {
    try{
        const list = []
        const listbook = await Book.find()
        listbook.forEach((element) => {
            list.push({ Title: element.title, Author: element.author, Year: element.year })
        })
        console.table(list)
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}

exports.editBook = async (bookObj, newObj) => {
    try{
        await Book.updateOne(bookObj, newObj)
        if (bookObj.author){
            console.log(`Successfully changed ${bookObj.author} to ${newObj.$set.author}`)
        }
        else if (newObj.$set.year){
            console.log(`Successfully changed the rating of ${bookObj.title} to ${newObj.$set.year}`)
        }
        else if (bookObj.title){
            console.log(`Successfully changed ${bookObj.title} to ${newObj.$set.title}`)
        }
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}

exports.findBook = async (bookObj) => {
    try{
        const list = []
        const listbook = await Book.find(bookObj)
        listbook.forEach((element) => {
            list.push({ Title: element.title, Author: element.author, Year: element.year })
        })
        console.table(list)
        mongoose.disconnect()
    } catch (error) {
        console.log (error)
        mongoose.disconnect()
    }
}