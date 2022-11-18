import express  from "express";
import mongoose from 'mongoose';
import cors from 'cors';    
import dotenv  from "dotenv";
import chats from "./data/data.js";
import userRoutes from './Routes/user.js';
import UserModel from "./models/UserModel.js";


// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const {chats} = require("./data/data");
// const userRoutes = require("./Routes/user")



const app = express();
app.use(cors());
app.use(express.json()); //to accept json data
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use('/user',userRoutes);
 
//  console.log(UserModel.find({}));

// app.listen(5000,console.log(`server running on port ${PORT}`));
 mongoose.connect('mongodb://0.0.0.0:27017/chat',{useNewUrlParser:true,useUnifiedTopology:true})
            .then(()=> app.listen(PORT,()=>{console.log(`server running on port ${PORT}`);}))
            .catch((error)=>{console.log(error.message);});