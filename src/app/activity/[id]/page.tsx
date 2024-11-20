import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import AppLayout from "@/app/components/app-layout"

export default function ActivityPage() {
    return (
        <AppLayout>
            <main className="container mx-auto px-4 pt-20 pb-8">
                {/* 武器详情 */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative w-full md:w-2/3 aspect-video">
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                            <Image
                                src="/placeholder.svg"
                                alt="武器展示"
                                className="w-full h-full object-cover rounded-lg"
                                width={800}
                                height={450}
                            />
                        </div>
                        <div className="w-full md:w-1/3 space-y-4">
                            <h1 className="text-2xl font-bold">AWP | 龙王 (崭新出厂)</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-500">￥</span>
                                <span className="text-3xl font-bold text-yellow-500">1688.00</span>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                立即购买
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 相关推荐 */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">相关推荐</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="bg-gray-900 border-gray-800">
                                <div className="p-4 space-y-2">
                                    <Image
                                        src="/placeholder.svg"
                                        alt={`推荐武器 ${i + 1}`}
                                        className="w-full aspect-square object-cover rounded-lg"
                                        width={200}
                                        height={200}
                                    />
                                    <h3 className="text-sm font-medium truncate">AWP | 二西莫夫</h3>
                                    <div className="flex items-center text-yellow-500">
                                        <span className="text-xs">￥</span>
                                        <span className="font-bold">888.00</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* 开箱记录 */}
                <section>
                    <h2 className="text-xl font-bold mb-4">开箱记录</h2>
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800"
                            >
                                <Image
                                    src="/placeholder.svg"
                                    alt={`开箱记录 ${i + 1}`}
                                    className="w-16 h-16 object-cover rounded"
                                    width={64}
                                    height={64}
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">用户名{i + 1}</h3>
                                    <p className="text-sm text-gray-400">开出了 AWP | 龙王 (崭新出厂)</p>
                                </div>
                                <span className="text-yellow-500">
                                    <span className="text-xs">￥</span>
                                    <span className="font-bold">1688.00</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </AppLayout>
    )
}