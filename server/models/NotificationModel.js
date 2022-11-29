import mongoose from 'mongoose';


const notificationModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    content :{type:String , trim:true},
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
}
,
    {
        timestamps:true,
    });
    export default mongoose.model('Message',messageModel);