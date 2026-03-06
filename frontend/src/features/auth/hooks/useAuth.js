import { useContext } from "react";
import { login,register,logout } from "../services/auth.api";
import { authContext } from "../store/auth.context";


export const useAuth = ()=>{

    const {loading,setLoading,user,setUser} = useContext(authContext)

    const handleLogin = async(username,password)=>{
         setLoading(true)
         const fetchUser = await login(username,password);
         console.log(fetchUser)
         setUser(fetchUser)
         setLoading(false)

    }
    const handleRegister = async(username,email,password)=>{
         setLoading(true)
         const fetchUser = await register(username,email,password);
          console.log(fetchUser)
         setUser(fetchUser)
         setLoading(false)

    }
    const handleLogout = async()=>{
         setLoading(true)
         const res = await logout();
          console.log(res)
         setLoading(false)

    }

    return {user,loading,handleLogin,handleRegister,handleLogout}

}