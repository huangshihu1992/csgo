'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, Swords, X, Users, Trophy, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AppLayout from '@/app/components/app-layout'

interface BattleItem {
    id: number
    name: string
    image: string
    price: number
    user: {
        name: string
        avatar: string
    }
}

const BATTLE_ITEMS: BattleItem[] = [
    {
        id: 1,
        name: 'AK-47 | 黄金涂装',
        image: '/placeholder.svg',
        price: 53.56,
        user: {
            name: 'Player 1',
            avatar: '/placeholder.svg'
        }
    },
    {
        id: 2,
        name: 'M4A4 | 龙王',
        image: '/placeholder.svg',
        price: 14.60,
        user: {
            name: 'Player 2',
            avatar: '/placeholder.svg'
        }
    }
]

export default function BattlePage() {
    const [priceRange, setPriceRange] = useState([0, 200000])

    return (
        <AppLayout>
            {/* 主要内容 */}
            <div className="container mx-auto px-4 py-6">
                {/* 规则说明 */}
                <div className="mb-8 space-y-4">
                    {['常规战斗', '双倍战斗', '延时模式'].map((type, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Swords className="h-5 w-5 text-yellow-500 mt-1" />
                                <div>
                                    <h3 className="font-medium mb-2">{type}</h3>
                                    <p className="text-sm text-gray-400">
                                        玩家选择自己的武器参与对战，系统随机选择获胜者。胜利者获得所有武器。
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 当前战斗状态 */}
                <div className="mb-8 bg-gray-900/50 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            <span>正在进行的战斗</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                                <X className="h-4 w-4" />
                                <span>0</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>52</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Info className="h-4 w-4" />
                                <span>494,519</span>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800">
                        + 创建战斗
                    </Button>
                </div>

                {/* 推荐广播 */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">推荐广播</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {Array(5).fill(null).map((_, index) => (
                            <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Weapon"
                                    width={200}
                                    height={150}
                                    className="w-full h-auto mb-2"
                                />
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/placeholder.svg"
                                        alt="User"
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-yellow-500">￥ 55.20</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 价格范围滑块 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">价格范围</span>
                        <span className="text-sm text-yellow-500">
                            ￥{priceRange[0]} - ￥{priceRange[1]}
                        </span>
                    </div>
                    <Slider
                        defaultValue={[0, 200000]}
                        max={200000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-4"
                    />
                </div>

                {/* 比赛列表 */}
                <div className="space-y-4">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="w-full bg-transparent border-b border-gray-800">
                            <TabsTrigger
                                value="all"
                                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
                            >
                                所有
                            </TabsTrigger>
                            <TabsTrigger
                                value="normal"
                                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-yellow-500"
                            >
                                常规战斗
                            </TabsTrigger>
                            <TabsTrigger
                                value="double"
                                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                            >
                                双倍战斗
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {[1, 2, 3].map((battleId) => (
                        <div key={battleId} className="bg-gray-900/50 rounded-lg p-4">
                            <div className="grid grid-cols-3 gap-4">
                                {BATTLE_ITEMS.map((item) => (
                                    <div key={item.id} className="col-span-1">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={200}
                                            height={150}
                                            className="w-full h-auto mb-2"
                                        />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={item.user.avatar}
                                                    alt={item.user.name}
                                                    width={24}
                                                    height={24}
                                                    className="rounded-full"
                                                />
                                                <span className="text-sm">{item.user.name}</span>
                                            </div>
                                            <span className="text-sm text-yellow-500">￥ {item.price}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-span-1 flex items-center justify-center">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                        加入战斗
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}