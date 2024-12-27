const jwt = require("jsonwebtoken")
const Book = require("../models/bookModel")
const User = require('../models/userModel')

const addBookController = async (req, res) => {
    try {
      // Extract user ID from headers (ensure the ID exists)
      const { id } = req.headers;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Find user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user is an admin (assuming role '1' means admin)
      if (user.role !== 1) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
  
      // Validate book data
      const { url, title, author, price, desc, language } = req.body;
      if (!url || !title || !author || !price || !desc || !language) {
        return res.status(400).json({ message: 'All book fields are required' });
      }
  
      // Create a new book instance
      const book = new Book({
        url,
        title,
        author,
        price,
        desc,
        language,
      });
  
      
      await book.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Book added successfully' });
      
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const updateBookController = async (req,res) =>{
    try{
        const { bookid } = req.headers
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        })
        return res.status(200).json({
            message: "Book Updated Successfully"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occurred"})
    }
}

const deleteBookController = async (req,res) =>{
    try {
        const { bookid } = req.headers
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({
            message:"Book deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({message:"Book not deleted"})
    }
}

const getAllBooksController = async (req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1})
        return res.json({
            status: "all books are fetched",
            data: books
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"all books are not fetched"})
    }
}

const getRecentBookController = async (req,res) => {
    try {
        const books = await Book.find().sort({ cratedAt: -1}).limit(4)
        return res.json({
            status:"success",
            data:books
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"not get recent books"})
    }
}

const getBookByIdController = async (req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        return res.json({
            status: "Success",
            data: book
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message :"Not fetch book by id"})
    }
}


module.exports={ addBookController,updateBookController,deleteBookController,getAllBooksController,getRecentBookController,getBookByIdController }
