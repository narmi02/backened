import mongoose from "mongoose";
import express from "express";
import { user } from "./Models/User.js";
import { note } from "./Models/Notes.js";
import router from "./Routes/auth.js";
import noterouter from "./Routes/notes.js";

const app=express()
const port=5000
const url="mongodb://localhost:27017"
let connection=await mongoose.connect(url)

app.use(express.json())
 
app.use('/api/auth',router)
app.use('/api/note',noterouter)

app.listen(port,()=>{
    console.log(`example app listening on localhost:${port}`)
})