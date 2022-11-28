import express  from "express";
import mongoose from 'mongoose';
import cors from 'cors';    
import dotenv  from "dotenv";
import chats from "./data/data.js";
import userRoutes from './Routes/user.js';
import chatRoutes from './Routes/chat.js';
import messageRoutes from './Routes/message.js';
import UserModel from "./models/UserModel.js";
import { Server } from 'socket.io';


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
app.use('/chat',chatRoutes);
app.use('/message',messageRoutes);
 
//  console.log(UserModel.find({}));

// app.listen(5000,console.log(`server running on port ${PORT}`));
 mongoose.connect('mongodb://0.0.0.0:27017/chat',{useNewUrlParser:true,useUnifiedTopology:true})
            .then(()=> app.listen(PORT,()=>{console.log(`server running on port ${PORT}`);}))
            .catch((error)=>{console.log(error.message);});

