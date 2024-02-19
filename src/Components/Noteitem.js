import React, { useContext } from 'react'
// import notecontext from '../context/note/Notecontext'



const Noteitem = (props) => {
    const { note , deletenote,updatenote} = props
    // const context=useContext(notecontext)
    // const { deletenote }=context
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.desc}</p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletenote(note._id)}} ></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}} ></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
