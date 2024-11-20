'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Menu, Wifi, Crown, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import LoginDialog from '@/components/login-dialog'

// Giveaway数据
const GIVEAWAYS = [
    {
      id: 1,
      name: '黄金膜拜AK-47',
      price: 11888.19,
      image: '/images/logo.png',
      participants: 36,
      timeLeft: '03:23:58:26'
    },
    {
      id: 2,
      name: '火蛇AK-47',
      price: 5888.74,
      image: '/images/logo.png',
      participants: 43,
      timeLeft: '03:20:58:51'
    }
  ]

interface NavbarProps {
    className?: string
}

export default function Navbar({ className }: NavbarProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    return (
        <div className={cn(
            "transition-all duration-300 pt-16", // 添加 pt-16 来为固定定位的导航栏留出空间
            isMobile ? "" : "md:ml-[240px] md:mr-[300px]"
        )}>
            {/* 导航栏 */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 border-b border-gray-800 flex">
                <div className="w-full px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Logo 部分 */}
                        <div className="flex-1">
                            <Image
                                src="/images/logo.png"
                                alt="GCSGO Logo"
                                width={120}
                                height={40}
                                className="h-8 w-auto"
                            />
                        </div>
                        {!isMobile && (
                            <div className="relative w-64">
                                <Input
                                    type="search"
                                    placeholder="搜索"
                                    className="bg-gray-900 border-gray-700"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* 登录按钮部分 */}
                    <div className="flex-1 flex justify-end items-center gap-4">
                        <Button
                            variant="default"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => setShowLoginDialog(true)}
                        >
                            登录
                        </Button>
                        {isMobile && (
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Giveaways区域 */}
            <section className={`${isMobile ? 'mt-4' : 'mt-24'} container mx-auto px-4`}>
                <div className="flex items-center gap-2 mb-4">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <h2 className="text-lg font-bold">NEW GIVEAWAYS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {GIVEAWAYS.map(giveaway => (
                        <div
                            key={giveaway.id}
                            className="relative bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
                        >
                            <Image
                                src={giveaway.image}
                                alt={giveaway.name}
                                width={200}
                                height={150}
                                className="w-full h-auto"
                            />
                            <div className="mt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-yellow-500">￥ {giveaway.price}</span>
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{giveaway.participants}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-2 text-sm text-gray-400">
                                    <Clock className="h-4 w-4" />
                                    <span>{giveaway.timeLeft}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 移动端网络状态 */}
            {isMobile && (
                <div className="mt-16 p-4 flex items-center gap-2 bg-gray-900">
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span className="text-sm">网络</span>
                    <span className="text-green-500 text-sm">107</span>
                    <span className="text-gray-400 text-sm">在线</span>
                </div>
            )}

            {/* 添加登录弹窗 */}
            <LoginDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
            />
        </div>
    )
}
