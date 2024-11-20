'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, Copy, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import AppLayout from '../components/app-layout'

interface WeaponItem {
    id: string
    name: string
    type: string
    image: string
    price: number
}

const WEAPONS: WeaponItem[] = [
    {
        id: '1',
        name: 'AK-47',
        type: '黄金涂装',
        image: '/placeholder.svg',
        price: 2955.20
    },
    {
        id: '2',
        name: '蝴蝶刀',
        type: '紫光之色',
        image: '/placeholder.svg',
        price: 1353.19
    },
    {
        id: '3',
        name: 'M4A4',
        type: '皇家蓝',
        image: '/placeholder.svg',
        price: 941.24
    }
]

export default function RollRoom() {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 12,
        minutes: 11,
        seconds: 50
    })

    return (
        <AppLayout>
            {/* 主要内容 */}
            <div className="container mx-auto px-4 py-6">
                {/* Logo和邀请码 */}
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/placeholder.svg"
                        alt="GCSGO Logo"
                        width={120}
                        height={120}
                        className="rounded-full mb-4"
                    />
                    <p className="text-center text-gray-400 mb-4">
                        帝豪福利roll房密码加官群 974819706
                    </p>
                    <div className="w-full max-w-md flex gap-2">
                        <Input
                            value="https://www.gpcsgo.com/roll/435"
                            readOnly
                            className="bg-gray-900 border-gray-700"
                        />
                        <Button variant="outline" size="icon">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* 倒计时 */}
                <div className="mb-8">
                    <p className="text-center text-purple-400 mb-2">活动将结束于:</p>
                    <div className="flex justify-center gap-4">
                        {Object.entries(timeLeft).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="bg-gray-900 rounded-lg p-3 min-w-[60px]">
                                    <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    {key === 'days' ? '天' :
                                        key === 'hours' ? '小时' :
                                            key === 'minutes' ? '分钟' : '秒'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 奖品展示 */}
                <div className="mb-8">
                    <h2 className="text-lg font-medium mb-4">赢得战利品</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {WEAPONS.map(weapon => (
                            <div
                                key={weapon.id}
                                className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                            >
                                <Image
                                    src={weapon.image}
                                    alt={weapon.name}
                                    width={200}
                                    height={150}
                                    className="w-full h-auto mb-4"
                                />
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{weapon.name}</h3>
                                        <p className="text-sm text-gray-400">{weapon.type}</p>
                                    </div>
                                    <span className="text-yellow-500">￥ {weapon.price.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 进度条 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">参加加入进度</span>
                        <span className="text-sm">37/500</span>
                    </div>
                    <Progress value={7.4} className="h-2" />
                </div>

                {/* 统计数据 */}
                <div className="grid grid-cols-5 gap-4 text-center">
                    {[
                        { label: '在线人数', value: '101' },
                        { label: '用户总数', value: '7,040' },
                        { label: '开箱次数', value: '94,751' },
                        { label: '升级次数', value: '35,753' },
                        { label: '总计交易', value: '493,793' }
                    ].map((stat, index) => (
                        <div key={index} className="p-4">
                            <p className="text-xl font-bold">{stat.value}</p>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}