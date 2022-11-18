// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    id:{type:String},
    name:{type:String , required:true},
    email :{type:String , required:true,unique:true},
    password :{type:String , required:true},
    pic :{type:String ,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    
}
,
    {
        timestamps:true,
    });
    export default mongoose.model('User',userModel);