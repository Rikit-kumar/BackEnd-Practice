import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContextStore } from '../context/AuthContext'

const AuthLayout = () => {

  const {user, loading} = useContext(AuthContextStore);

  if(loading){
    return <div>Loading...</div>;
  }

  if(user){
    return <Navigate to="/main" replace />;
  }

  return <Outlet />
}

export default AuthLayout