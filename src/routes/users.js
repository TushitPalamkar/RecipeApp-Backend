import express from "express"
import { userModel } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router=express.Router();
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newuser=new userModel({username,password:hashpassword})
    await newuser.save();
    res.json({ message: "User registered successfully" });
  });

  router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=await userModel.findOne({username})
    if(!user)
        {
            return res.json({msg:'User does not exist'})
        }
    
    const ispasswordValid=await bcrypt.compare(password,user.password)
    if(!ispasswordValid)
        {
            return res.json({msg:'Username or password is incorrect'})
        }
        const token=jwt.sign({id:user._id},"secret")
  res.json({token,userID:user._id})
  })
  
export {router as userRouter};