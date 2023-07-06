const express = require("express");
const { BookModel } = require("../models/book.model");

const bookRouter = express.Router();




bookRouter.get("/",async(req,res)=>{
    try {
        const { sort,genre } = req.query;
        console.log(sort)
        const filter = genre ? { genre } : {};
        const sortOption = sort==="asc" ? {price : 1} : sort === "desc" ? { price : -1} : {};
        const books = await BookModel.find(filter).sort(sortOption);
        console.log(books)
        res.status(200).send({ok:true,books:books})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
   
})


bookRouter.post("/add", async (req, res) => {
    try {
        const { title, author, genre, description, price } = req.body;
        const isBookAlreadyPresent = await BookModel.findOne({ title, author, genre });
        if (isBookAlreadyPresent) return res.status(400).send({ ok: false, msg: "Book already exists!" });
    
    
        const newBook = await BookModel({ title, author, genre, description, price });
        await newBook.save();
    
        res.status(200).send({ ok: true, msg: "New Book Added!" })
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
    
})


bookRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        await BookModel.findByIdAndDelete({_id:id});
        res.status(200).send({ok:true,msg:"Book deleted Sucessfully!"})

    } catch (error) {
        res.status(400).send({msg:error.message})
    }


})



module.exports = {
    bookRouter
}