const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    sender:{
        type:mongoose.Schema.es.ObjectId,
        ref:"User",
    },
    content :{type:String , trim:true},
    Chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
    }
}
,
    {
        timestamps:true,
    });
    export default mongoose.model('Message',messageModel);