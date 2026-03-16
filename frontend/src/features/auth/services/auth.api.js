import axios from 'axios';

const api =  axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export const login = async (username,password)=>{
    const response = await api.post("/login",{username,password});
    console.log("fetched")
    return response.data
}
export const register = async (username,email,password)=>{
    const response = await api.post("/register",{username,email,password});
    return response.data
}
export const logout = async ()=>{
    const response = await api.post("/logout");
    return response.data
}

export const getUser = async()=>{
  const response = await api.get("/get-me")
  console.log(response.data)
  return response.data
}

