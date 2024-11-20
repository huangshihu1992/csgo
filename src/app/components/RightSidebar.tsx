'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Crown, ArrowUpCircle, Clock, User } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'competition' | 'upgrade'
  title: string
  image: string
  time: string
  users?: number
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'competition',
    title: '摩托手套 (★)',
    image: '/images/logo.png',
    time: '12 分钟前',
    users: 36
  },
  {
    id: '2',
    type: 'upgrade',
    title: 'M4A4 活色生香',
    image: '/images/logo.png',
    time: '几秒前'
  },
  // 添加更多活动项...
]

interface RightSidebarProps {
  className?: string
  isMobile?: boolean
}

export default function RightSidebar({ className, isMobile = false }: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState('competition')
  const router = useRouter()

  const ActivityItem = ({ item }: { item: ActivityItem }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors" onClick={() => router.push(`/battle/${item.id}`)}>
      <Image
        src={item.image}
        alt={item.title}
        width={48}
        height={48}
        className="rounded-md"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">{item.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <Clock className="h-3 w-3" />
          <span>{item.time}</span>
          {item.users && (
            <>
              <User className="h-3 w-3 ml-2" />
              <span>{item.users}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const TabContent = ({ type }: { type: 'competition' | 'upgrade' }) => (
    <ScrollArea className="h-full">
      <div className="space-y-2 p-4">
        {ACTIVITIES.filter(item => item.type === type).map(item => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )

  return (
    <div
      className={cn(
        "bg-gray-900/50 border-l border-gray-800",
        isMobile ? "w-full" : "w-[300px]",
        className
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>110</span>
            <span>在线</span>
          </div>
        </div>

        <Tabs
          defaultValue="competition"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1"
        >
          <TabsList
            className={cn(
              "w-full h-12 bg-transparent border-b border-gray-800",
              isMobile && "overflow-x-auto flex-nowrap"
            )}
          >
            <TabsTrigger
              value="competition"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
            >
              <Crown className="h-4 w-4 mr-2" />
              欧皇
            </TabsTrigger>
            <TabsTrigger
              value="upgrade"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
            >
              <ArrowUpCircle className="h-4 w-4 mr-2" />
              在线
            </TabsTrigger>
          </TabsList>

          <TabsContent value="competition" className="flex-1 m-0">
            <TabContent type="competition" />
          </TabsContent>
          <TabsContent value="upgrade" className="flex-1 m-0">
            <TabContent type="upgrade" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}