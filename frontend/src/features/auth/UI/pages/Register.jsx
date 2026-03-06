import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import Button from '../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {handleRegister,user,loading} = useAuth()
    const navigate = useNavigate()

     const handleSubmit = async(e)=>{
     e.preventDefault()
     await handleRegister(username,password,email)
     if(user){
       navigate("/")

     }
   }
  return (
     <main>
        <div className="form-cont">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
               <FormGroup onChange={(e)=>(setUsername(e.target.value))} label={"username"} />
               <FormGroup onChange={(e)=>(setEmail(e.target.value))} label={"email"} />
               <FormGroup onChange={(e)=>(setPassword(e.target.value))} label={"password"} />
               <Button value={"Submit"}/>
            </form>
        </div>
    </main>
  )
}

export default Register
