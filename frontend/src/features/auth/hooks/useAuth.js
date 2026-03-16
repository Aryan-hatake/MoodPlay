import { useContext } from "react";
import { login,register,logout,getUser } from "../services/auth.api";
import { authContext } from "../store/auth.context";


export const useAuth = ()=>{

    const {loading,setLoading,user,setUser} = useContext(authContext)
    

    const handleLogin = async(username,password)=>{
         setLoading(true)
         const fetchUser = await login(username,password);
         console.log(fetchUser.user)
         setUser(fetchUser.user)
         setLoading(false)

    }
    const handleRegister = async(username,email,password)=>{
         setLoading(true)
         const fetchUser = await register(username,email,password);
          console.log(fetchUser.user)
         setUser(fetchUser.user)
         setLoading(false)

    }
    const handleLogout = async()=>{
         setLoading(true)
         const res = await logout();
          console.log(res)
         setLoading(false)

    }
    
    const handleGetUser  = async()=>{
       try{
          setLoading(true)
          const res = await getUser();
          setUser(res.user)
       }
       catch(err){
          console.log(err)
       }
       finally{
          setLoading(false)
       }
    }
    return {user,loading,handleLogin,handleRegister,handleLogout,handleGetUser}

}