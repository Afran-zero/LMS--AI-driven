"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
// import { db } from '@/configs/db'
// import { users } from '@/configs/schema'
// import { eq } from 'drizzle-orm'
import axios from 'axios'

function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) CheckIsNewUser();
  }, [user])

  const CheckIsNewUser = async () => {
   
const resp= await axios.post('/api/create-user', { user: user });
console.log(resp.data)

  }

  return <>{children}</>
}

export default Provider