import mongoose, { mongo } from "mongoose";

const Noteschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export const note=mongoose.model('note',Noteschema)

