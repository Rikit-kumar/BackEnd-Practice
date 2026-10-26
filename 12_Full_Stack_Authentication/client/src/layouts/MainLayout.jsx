import React from 'react'
import { useContext } from 'react'
import { Outlet } from 'react-router'
import { AuthContextStore } from '../context/AuthContext'

const MainLayout = () => {

  const {user, loading} = useContext(AuthContextStore)

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default MainLayout