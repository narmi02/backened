import React, { useContext, useState } from 'react'
import notecontext from '../context/note/Notecontext'

const Addnote = () => {
    const context=useContext(notecontext)
    const { Addnote }=context
    const[note,setnotes]=useState({title:"",desc:"",tag:""})


    const handleclick=(e)=>{
        e.preventDefault()
        Addnote(note.title,note.desc,note.tag)
        setnotes({title:"",desc:"",tag:""})
    }

    const onchange=(e)=>{
        setnotes({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <div className='container my-3'>
                <h3 >Add a Note</h3>
                <form className='my-1'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                        <input type="text" value={note.title}  className="form-control"  name="title" id='title' aria-describedby="emailHelp" onChange={onchange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                        <input type="text"value={note.desc}  className="form-control" id="description" name='desc' onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onchange}/>
                    </div>
                    <button disabled={note.title.length<3||note.desc.length<5} type="submit"  className="btn btn-primary" onClick={handleclick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
