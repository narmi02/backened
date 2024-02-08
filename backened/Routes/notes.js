import express from "express"
import { check, validationResult } from "express-validator";
import fetchuser from "../middleware/fetchuser.js";
import {note} from "../Models/Notes.js";


const noterouter = express.Router()


    // Route-2 fetch all notes but login is required

    noterouter.get("/mynotes",fetchuser,async(req,res)=>{
        try {
            let mynote= await note.find({userid:req.user.id})
            res.json(mynote)
        }catch (error) {
            console.error(error.message)
            res.status(400).send("internal server error")
        }
    })
// Route-1 add a note login is required

noterouter.post("/addnote", fetchuser,
    [
        check('title', "enter a valid title").isLength({ min: 3 }),
        check('desc', "enter a valid description").isLength({ min: 5 })
    ], async (req, res) => {
        try {
            const {title,desc,tag}=req.body
            // check only validation errors provided by the user to save the data
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() })
            }
            const newnote=new note({
                title,desc,tag,userid:req.user.id
            })
            const savenote = await newnote.save()
            res.json(savenote)
        }catch (error) {
            console.error(error.message)
            res.status(400).send("internal server error")
        }
    })

    // router 3 : updates the notes for particular user login is required 

    noterouter.put("/updatenote/:id",fetchuser,async(req,res)=>{
        try {
            const {title,desc,tag}=req.body
            let newnote={}
            if(title){newnote.title=title}
            if(desc){newnote.desc=desc}
            if(tag){newnote.tag=tag}
            
            let unote=await note.findById(req.params.id)

            if(!unote){
                return res.status(404).send("not found")
            }

            if(unote.userid.toString() !== req.user.id){
                return res.status(401).send("not allowed")
            }
            let newunote=await note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
            res.json(newunote)
        } catch (error) {
            console.error(error.message)
            res.status(400).send("internal server error")
        }
    })

    // route 4 : deletion of a particular note login required


    noterouter.delete("/deletenote/:id",fetchuser,async(req,res)=>{
        
        try {
            let delnote=await note.findById(req.params.id)
            if(!delnote){
                return res.status(401).send("Not allowed")
            }
            if(delnote.userid.toString() !== req.user.id){
                return res.status(401).send("not allowed")
            }
            delnote=await note.findByIdAndDelete(req.params.id)
            res.json({"success":"Note has been deleted",delnote})
        } catch (error) {
            console.error(error.message)
            res.status(400).send("internal server error")
        }

    })



export default noterouter