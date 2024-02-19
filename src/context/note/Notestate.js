
import { useState } from "react";
import notecontext from "./Notecontext";
import { json } from "react-router-dom";    

const Notestate = (props) => {
    const noteinitial =[]
    const [notes, setnotes] = useState(noteinitial)
    const host = "http://localhost:5000"

    const getnotes = async () => {
        // api call to display notes

        const response = await fetch(`${host}/api/note/mynotes`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNGNiODcxYTdmMjJmYTNmNDFhMDU3In0sImlhdCI6MTcwNzY1NTMwMX0.PiHBzh20SwtQhrArivJV4T8SSNHQS_SjM63KDN0tpuc"
            } 
        })
        const json=await response.json()
        setnotes(json)
    }

    // Add a note 

    const Addnote = async(title, desc, tag) => {

        const response = await fetch(`${host}/api/note/addnote`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNGNiODcxYTdmMjJmYTNmNDFhMDU3In0sImlhdCI6MTcwNzY1NTMwMX0.PiHBzh20SwtQhrArivJV4T8SSNHQS_SjM63KDN0tpuc"
            },
            body:JSON.stringify({title,desc,tag}) 
        })

        const note = await response.json()
        setnotes(notes.concat(note))
    }

    // delete a note

    const deletenote = async (id) => {
            const response = await fetch(`${host}/api/note/deletenote/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNGNiODcxYTdmMjJmYTNmNDFhMDU3In0sImlhdCI6MTcwNzY1NTMwMX0.PiHBzh20SwtQhrArivJV4T8SSNHQS_SjM63KDN0tpuc"
                } 

            })
            const json=await response.json()
            console.log(json)
            setnotes(json)
        console.log("deleting note of id : ", id)
        const newnote = notes.filter((note) => { return note._id !== id })
        setnotes(newnote)
    }

    // editnote 
    const editnote = async (id,title,desc,tag) => {
        const response = await fetch(`${host}/api/note/updatenote/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNGNiODcxYTdmMjJmYTNmNDFhMDU3In0sImlhdCI6MTcwNzY1NTMwMX0.PiHBzh20SwtQhrArivJV4T8SSNHQS_SjM63KDN0tpuc"
            },
            body:JSON.stringify({title,desc,tag}) 

        })
        let newnote=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newnote[index]
            if (element._id === id) {
                element.title = title
                element.desc = desc
                element.tag = tag
                console.log(element)
                console.log(index)
                break
            }
        }
        setnotes(newnote)
}

    return (
        <notecontext.Provider value={{ notes, Addnote, deletenote ,getnotes,editnote}}>
            {props.children}
        </notecontext.Provider>
    )
}

export default Notestate