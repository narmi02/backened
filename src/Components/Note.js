import React, { useContext, useEffect, useRef,useState } from 'react'
import notecontext from '../context/note/Notecontext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'


const Note = () => {
    const context = useContext(notecontext)
    const { notes, deletenote, getnotes,editnote} = context
    const[note,setnotes]=useState({id:"",etitle:"",edescription:"",etag:""})


    const updatenote = (currentnote) => {
        ref.current.click()
        setnotes({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.desc,etag:currentnote.tag})
    }
    const ref = useRef(null)
    const refclose=useRef(null)

    useEffect(() => {
        // eslint-disable-next-line
        getnotes()
    }, [])


    const handleclick=(e)=>{
        editnote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click()
    }

    const onchange=(e)=>{
        setnotes({...note,[e.target.name]:e.target.value})
    }
    
    return (
        <>
            <Addnote />
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-1'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                                    <input type="text" className="form-control" value={note.etitle} name="etitle" id='etitle' aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                                    <input type="text" className="form-control" value={note.edescription} id='edesc' name='edescription' onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword2" className="form-label">tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<3||note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row '>
                <h3>Your Note</h3>
                <div className='container'>
                {notes.length===0 && "no notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} deletenote={deletenote} updatenote={updatenote} />
                })}
            </div>
        </>
    )
}

export default Note
