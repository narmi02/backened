import express from "express";
import { user } from "../Models/User.js";
import { check, checkSchema, validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";


const router=express.Router()
const JWT_SECRET='!mr@n'

// Route-1 : create a user authentication like storing data 

router.post("/createuser",
[
    check('password',"enter a valid password").isLength({ min: 3 }),
    check('email',"enter a valid email").isEmail(),
    check('name',"enter a valid name").isLength({min:4})
], async (req,res)=>{
    // check only validation errors provided by the user to save the data
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    // const User=user(req.body)
    // User.save()
    try {  
        let User=await user.collection.findOne({email:req.body.email})
        if(User){
            return res.status(400).json({error:"user already exists"})
        } 
        const salt= await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(req.body.password,salt)
        
        // create the schema of user data and stores
        
        User=await user.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const data={
            user:{
                id:User.id
            }
        }
        const authentoken=jwt.sign(data,JWT_SECRET)
        res.json({success:"true",authentoken})
    } catch (error) {
        console.error(error.message)
        res.status(400).send("internal server error")
    }
})

// Route-2  login using that authentication 

router.post("/login",
[
    check('email',"enter a valid email").isEmail(),
    check('password',"enter a valid password").exists()
], async (req,res)=>{
    // let success=false
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const{email,password}=req.body
    try {
        let User=await user.findOne({email})
        if(!User){
           return res.status(400).json({success:"false", error:"please enter valid credentials"})
        }
        let passwordcheck=await bcrypt.compare(password,User.password)
        if(!passwordcheck){
            return res.status(400).json({success:"false", error:"please enter valid credentials"})
        }
        const data={
            user:{
                id:User.id
            }
        }
        const authentoken=jwt.sign(data,JWT_SECRET)
        res.json({success:"true" , authentoken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("internal server error")
    }


})

// router-3 : fetching the data from token

router.post("/getuser",fetchuser, async (req,res)=>{
    const userid=req.user.id
    try {
        const User= await user.findById(userid).select("-password")
         res.send(User)
    } catch (error){
            console.log(error.message)
            res.status(500).send("internal server error")
    }
})

export default router