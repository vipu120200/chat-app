// import express  from "express";
// import dotenv  from "dotenv";
// import {chats} from "./data/data";

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/api/chat",(req,res)=>{
    res.send(chats);
})
app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find((c)=> c._id === req.params.id);
    res.send(singleChat);
    
})

// app.listen(5000,console.log(`server running on port ${PORT}`));
 mongoose.connect('mongodb://0.0.0.0:27017/chat',{useNewUrlParser:true,useUnifiedTopology:true})
            .then(()=> app.listen(PORT,()=>{console.log(`server running on port ${PORT}`);}))
            .catch((error)=>{console.log(error.message);});