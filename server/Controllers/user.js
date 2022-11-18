import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



export const signup = async (req , res) => {
    const {name,email,password,confirmPassword,pic} = req.body;
    if(!name || !email || !password)
    {
        res.send(400);
        throw new Error("Please Enter all the fields");
    }
    try{
        const userExist = await UserModel.findOne({email});
        if(userExist) res.send(404).json({message:"User Already Exist!"});
        
        if(password !== confirmPassword) return res.status(400).json({message:"Password Do'nt Match"});
        const hashedPassword = await bcrypt.hash(password,12);
        const result = UserModel.create({name,email,password:hashedPassword,pic });
        console.log(result);
        const token =jwt.sign({email:result.email , id:result._id},'test',{expiresIn : "1h"});

        res.status(200).json({result:result,token});
    }
    catch(err)
    {
        res.status(500).json({message:"something went wrong"});
   }
}

export const signin = async (req , res) => {
    const {email,password}=req.body;
    try{
        const userExist = await UserModel.findOne({email});
        if(!userExist) res.send(404).json({message:"User does'nt Exist!"});

        const isPasswordCorrect =   await bcrypt.compare(password,userExist.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});
         
        const token =jwt.sign({email:userExist.email , id:userExist._id},'test',{expiresIn : "1h"});

        res.status(200).json({result:userExist,token});
    }
    catch(err)
    {
        res.status(500).json({message:"something went wrong"});
    }
    

}


