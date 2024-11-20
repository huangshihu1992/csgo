'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CodeIcon } from './svg/CodeIcon'
import { RollIcon } from './svg/RollIcon'
import { Menu, X, ChevronLeft, ChevronRight, Gift, Sword, Crown, ShoppingBag, ArrowUpDown, Headphones, Users, HelpCircle, DollarSign } from 'lucide-react'

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // 修改基础菜单项的渲染方式
  const BasicMenuItems = () => (
    <div className="px-4 py-2">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className={cn(
            "relative flex-1 flex flex-col items-center justify-center gap-2",
            "md:w-[82px] md:h-[82px]", // 桌面端固定尺寸
            "h-20 w-full", // 移动端自适应
            "hover:bg-gray-800/50 overflow-hidden",
            "bg-gradient-to-b from-[rgba(52,56,57,0.15)] to-[rgba(52,56,57,0.3)]",
            "[&_svg]:!h-8 [&_svg]:!w-8"
          )}
        >
          {/* 背景图片 */}
          <Image
            src="/images/pic-money-bg.png"
            alt=""
            fill
            className="object-cover z-0"
          />
          {/* 内容 */}
          <CodeIcon className="h-6 w-6 z-10" />
          <span className="text-sm z-10 font-medium">使用Code</span>
        </Button>

        <Link href="/roll-room">
          <Button
            variant="ghost"
            className={cn(
              "relative flex-1 flex flex-col items-center justify-center gap-2",
              "md:w-[82px] md:h-[82px]", // 桌面端固定尺寸
              "h-20 w-full", // 移动端自适应
              "hover:bg-gray-800/50 overflow-hidden",
              "bg-gradient-to-b from-[rgba(52,56,57,0.15)] to-[rgba(52,56,57,0.3)]",
              "[&_svg]:!h-8 [&_svg]:!w-8"
              
            )}
          >
            {/* 背景图片 */}
            <Image
              src="/images/pic-gift-bg.png"
              alt=""
              fill
              className="object-cover z-0"
            />
            {/* 内容 */}
            <RollIcon className="h-6 w-6 z-10" />
            <span className="text-sm z-10 font-medium">ROLL房</span>
          </Button>
        </Link>
      </div>
    </div>
  )

  const menuItems = [
    {
      items: [
        { icon: Gift, label: '饰品开箱', link: '#', isNew: true },
        { icon: Sword, label: '竞技场', link: '#', isNew: true },
        { icon: ArrowUpDown, label: '升级兑换', link: '#', isNew: false },
        { icon: Crown, label: '欧皇福利', link: '#', isNew: false },
        { icon: ShoppingBag, label: '饰品商城', link: '#', isNew: false },
      ]
    },
    {
      items: [
        { icon: Headphones, label: '客服帮助', link: '#', isNew: false },
        { icon: Users, label: '官方福利群', link: '#', isNew: false },
        { icon: HelpCircle, label: '帮助中心', link: '#', isNew: false },
      ]
    }
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* 基础菜单项 */}
      <BasicMenuItems />

      {menuItems.map((section, idx) => (
        <div key={idx} className="mb-4">
          {section.title && (
            <div className="px-4 py-2 text-sm text-gray-400">
              {section.title}
            </div>
          )}
          <div className="space-y-1">
            {section.items.map((item, itemIdx) => (
              <Button
                key={itemIdx}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-4 gap-3 hover:bg-gray-800",
                  !isCollapsed ? "h-12" : "h-12 w-12 p-0 justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
                {!isCollapsed && item.isNew && (
                  <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                    N
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  // 修改桌面版侧边栏
  const DesktopSidebar = () => (
    <>
      {/* 当展开时显示的侧边栏 */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen fixed top-0 left-0 bg-gray-900 border-r border-gray-800 transition-all duration-300",
          isCollapsed ? "w-0 overflow-hidden" : "w-[240px]",
          className
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={100}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <SidebarContent />
      </div>

      {/* 展开/收起按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-1/2 -translate-y-1/2 md:flex hidden z-50 bg-gray-900 border border-gray-800 rounded-full", // 修改这行
          isCollapsed ? "left-4" : "left-[236px]"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </>
  )

  // 移动版侧边栏
  const MobileSidebar = () => (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-gray-900 p-0">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={100}
            height={32}
            className="h-8 w-auto"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}