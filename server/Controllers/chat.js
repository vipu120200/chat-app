import ChatModel from "../models/ChatModel.js";
import UserModel from "../models/UserModel.js";




export const accessChat = async(req,res) => {
    const {userId} = req.body;

    if(!userId)
    {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    console.log(req.userId );
    var isChat = await ChatModel.find({
        isGroupChat: false,
        $and: [
            {users:{$elemMatch: {$eq:req.userId}}},
            {users:{$elemMatch: {$eq:userId}}}
        ],
    }).populate("users","-password").populate("latestMessage");

    isChat = await UserModel.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    });
    
    console.log(isChat);
    if(isChat.length > 0){
        res.send(isChat[0]);
    }
    else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.userId,userId],
        }
        try{
            const createdChat = await ChatModel.create(chatData);

            const fullChat = await ChatModel.findOne({_id:createdChat._id}).populate("users","-password");
            res.status(200).send(fullChat);
        }catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }
} 

export const fetchChats = async(req,res) => {
    
    try{
        ChatModel.find({users:{$elemMatch: {$eq:req.userId}}}).populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async (results) => {
            results = await UserModel.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email",
            })
            res.status(200).send(results);
        })

    }catch(err)
    {
        res.status(400);
        throw new Error(err.message);
    }
} 

export const createGroup = async(req,res) => {

    if(!req.body.users || !req.body.name){
            return res.status(400).send({message:"Please fill all the fields"});
    }
    var users =JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send({message:"MOre than 2 users required to fom a group"});
    }
    users.push(req.user);
    try{
        const groupChat =  await ChatModel.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user
        });
        const fullGroupChat = await ChatModel.find({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");

        res.status(200).json(fullGroupChat);


    }catch(err)
    {
            res.status(400);
            throw new Error(err.message);

    }
}

export const renameGroup = async(req,res) => {
    const {chatId , chatName} = req.body;
    const updatedChat = await ChatModel.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new:true,
        }
    ).populate("users","-password")
        .populate("groupAdmin","-password");

        if(!updatedChat)
        {
            res.status(400);
            throw new Error("Chat not Found");
        }
        else{
            res.json(updatedChat);
        }
}

export const addToGroup = async(req,res) => {
    const {chatId , userId} = req.body;
    const added = await ChatModel.findByIdAndUpdate(
        chatId,
       { $push:{users:userId}
        },{ new:true}
    ).populate("users","-password")
        .populate("groupAdmin","-password");

        if(!added)
        {
            res.status(400);
            throw new Error("Chat not Found");
        }
        else{
            res.json(added);
        }
}

export const removeFromGroup  = async(req,res) => {
    const {chatId , userId} = req.body;
    const removed = await ChatModel.findByIdAndUpdate(
        chatId,
       { $pull:{users:userId}
        },{ new:true}
    ).populate("users","-password")
        .populate("groupAdmin","-password");

        if(!removed)
        {
            res.status(400);
            throw new Error("Chat not Found");
        }
        else{
            res.json(removed);
        }
}