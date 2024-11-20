'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '../components/app-layout'

interface WeaponItem {
    id: string
    name: string
    type: string
    quality: string
    image: string
    price: number
    tag: 'FN' | 'MW' | 'FT' | 'WW' | 'BS'
}

const WEAPONS: WeaponItem[] = [
    {
        id: '1',
        name: 'AUG',
        type: '死亡杠',
        quality: '崭新出厂',
        image: '/placeholder.svg',
        price: 0.09,
        tag: 'FN'
    },
    // ... 添加更多武器数据
]

export default function ShopPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [priceRange, setPriceRange] = useState([0, 10000])
    const [sortBy, setSortBy] = useState('price-asc')

    return (
        <AppLayout>

            {/* 主要内容 */}
            <div className="container mx-auto px-4 py-6">
                {/* 搜索和筛选区 */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Input
                                type="search"
                                placeholder="输入物品名称"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-900 border-gray-700 pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full md:w-[200px] bg-gray-900 border-gray-700">
                                <SelectValue placeholder="排序方式" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price-asc">价格从低到高</SelectItem>
                                <SelectItem value="price-desc">价格从高到低</SelectItem>
                                <SelectItem value="name-asc">名称 A-Z</SelectItem>
                                <SelectItem value="name-desc">名称 Z-A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">价格范围</span>
                            <span className="text-sm text-yellow-500">
                                ￥{priceRange[0]} - ￥{priceRange[1]}
                            </span>
                        </div>
                        <Slider
                            defaultValue={[0, 10000]}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onValueChange={setPriceRange}
                        />
                    </div>
                </div>

                {/* 商品网格 */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {WEAPONS.map((weapon) => (
                        <div
                            key={weapon.id}
                            className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
                        >
                            <div className="relative aspect-square mb-4">
                                <Image
                                    src={weapon.image}
                                    alt={weapon.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-2"
                                />
                                <span className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded bg-purple-500/50">
                                    {weapon.tag}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium truncate">{weapon.name}</h3>
                                <p className="text-sm text-gray-400 truncate">{weapon.type}</p>
                                <p className="text-sm text-gray-400">{weapon.quality}</p>
                                <p className="text-yellow-500">￥ {weapon.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 分页 */}
                <div className="mt-8 flex justify-center gap-2">
                    <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <Button
                            key={page}
                            variant={page === 1 ? "default" : "outline"}
                            className={page === 1 ? "bg-purple-600" : ""}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </AppLayout>
    )
}