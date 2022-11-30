import mongoose from 'mongoose';


const notificationModel = mongoose.Schema({
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
}
,
    {
        timestamps:true,
    });
    export default mongoose.model('Notification',notificationModel);