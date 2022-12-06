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
import bodyParser from 'body-parser';

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const {chats} = require("./data/data");
// const userRoutes = require("./Routes/user")
dotenv.config();
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://0.0.0.0:27017/chat',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> {console.log(`server running on port ${PORT}`);})
.catch((error)=>{console.log(error.message);});

const app = express();
app.use(cors());
app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(express.json()); //to accept json data



app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use('/message',messageRoutes);
 
const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected")
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user)=>{
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message Recieved",newMessageRecieved);
        });
    });
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

});
