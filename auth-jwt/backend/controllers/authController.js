import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res) =>{
    const {username , email , password} = req.body;
    try{
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
        res.status(201).json({message:"User created successfully"});
    }catch(error){
        console.log(error);
    }
};

export const login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,findUser.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:findUser._id},process.env.JWT_SECRET,
           { expiresIn:"1d",

           });
        
        res.cookie('token' , token , {
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:24*60*60*1000
        });
        res.json({msg : "Login Successful" , findUser : findUser.username , email : findUser.email});
    }
    catch(err){
        res.status(500).json({msg : 'server error' , err});
    }
    }

    export const logout = async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ msg: "Logout successful" });
    }
    