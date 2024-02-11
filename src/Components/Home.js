import React, { useContext } from 'react'
import notecontext from '../context/note/Notecontext'

function Home() {
    const context=useContext(notecontext)
    const{notes,setnotes}=context
    return (
        <div>
            <div className='container my-3'>
            <h3 >Add a Note</h3>
            <form className='my-1'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            <h3>Your Note</h3>
            {notes.map((note)=>{
                console.log(note.title)
                return note.title
            })}
        </div>
    )
}

export default Home
