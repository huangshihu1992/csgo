'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/services/authService'

interface UserContextType {
  userInfo: any
  setUserInfo: (user: any) => void
  isAuthenticated: boolean
}

const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
  isAuthenticated: false,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    // 页面加载时检查本地存储的用户信息
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  return (
    <UserContext.Provider value={{
      userInfo,
      setUserInfo,
      isAuthenticated: !!userInfo
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)