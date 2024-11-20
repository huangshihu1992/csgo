'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import Navbar from './navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className={cn(
        "transition-all duration-300 pt-16",
        isMobile ? "" : "md:ml-[240px] md:mr-[300px]"
      )}>
        {children}
      </div>

      {/* 桌面端右侧边栏 */}
      {!isMobile && (
        <RightSidebar className="fixed top-0 right-0 h-screen" />
      )}
    </div>
  )
}