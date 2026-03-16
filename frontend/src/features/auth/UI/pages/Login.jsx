import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import Button from '../components/Button'
import { useAuth } from '../../hooks/useAuth'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const {handleLogin,user,loading} = useAuth()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  if(loading){
    return(
      <h1>Loading </h1>
    )
  }

  const handleSubmit = async(e)=>{
     e.preventDefault()
     await handleLogin(username,password)
  }
   if(user){
       navigate("/")

     }

    console.log(user)

  return (
    <main>
        <div className="form-cont">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
               <FormGroup onChange={(e)=>{setUsername(e.target.value)}} value = {username}  label={"username"} />
               <FormGroup onChange={(e)=>{setPassword(e.target.value)}} value={password} label={"password"} />
               <Button value={"Submit"}/>
            </form>
        </div>
    </main>
  )
}

export default Login
