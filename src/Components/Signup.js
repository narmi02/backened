
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const[credential,setcredential]=useState({name:"",email:"",password:"",cpassword:""})
  const host = "http://localhost:5000"
  const history=useNavigate()

  const handlesubmit=async (e)=>{
    e.preventDefault()

    if(credential.password===credential.cpassword){

      const response = await fetch(`${host}/api/auth/createuser`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email:credential.email,password:credential.password,name:credential.name}) 
      })
      
      const json = await response.json()
      console.log(json)
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        history('/login')
      }
    }
    else {
      alert("password not matched")
    }


  }

  const onchange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
  }
  
  return (
    <div>
<form className='container' onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onchange} value={credential.name} aria-describedby="emailHelp" minLength={4} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onchange} value={credential.email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onchange} value={credential.password} minLength={3}  required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Repeat Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} value={credential.cpassword} minLength={3} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>    
</div>
  )
}

export default Signup

