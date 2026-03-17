import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
  const { user, loading, handleGetUser } = useAuth();


 
  
    useEffect(()=>{
       (async function(){
          console.log("working?")
           await handleGetUser()
       })()
    },[])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }
   
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
