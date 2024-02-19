import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const[credential,setcredential]=useState({email:"",password:""})
  const host = "http://localhost:5000"
  const history=useNavigate()

  const handlesubmit=async (e)=>{
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/login`,{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjNGNiODcxYTdmMjJmYTNmNDFhMDU3In0sImlhdCI6MTcwNzY1NTMwMX0.PiHBzh20SwtQhrArivJV4T8SSNHQS_SjM63KDN0tpuc"
      },
      body:JSON.stringify({email:credential.email,password:credential.password}) 
  })

  const json = await response.json()
  console.log(json)
  if(json.success){
    localStorage.setItem('token',json.authtoken)
    history('/')
  }
  else {
    alert("invalid credentials")
  }


  }

  const onchange=(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
  }
  
  return (
    <div>
<form className='container' onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onchange} value={credential.email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onchange} value={credential.password} minLength={3} required />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>    
</div>
  )
}

export default Login
