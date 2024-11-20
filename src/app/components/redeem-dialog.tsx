'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import { X } from 'lucide-react'

interface RedeemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function Component({ open, onOpenChange }: RedeemDialogProps = { open: true, onOpenChange: () => {} }) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async () => {
    if (!code) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "请输入兑换代码",
      })
      return
    }

    setIsLoading(true)
    try {
      // 这里添加兑换逻辑
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "成功",
        description: "兑换成功！",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "兑换失败，请重试",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black/90 border-zinc-800 p-0">
        <div className="relative w-full min-h-[400px] px-4">
          {/* 关闭按钮 */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </button>

          {/* 背景图片 */}
          <div className="absolute top-0 right-0 w-48 h-48">
            <Image
              src="/images/prize.png"
              alt="Prize"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          
          {/* 标题 */}
          <h2 className="text-2xl font-bold mt-6 text-yellow-400/90">
            获得兑换奖励
          </h2>
          
          {/* 输入框和按钮容器 */}
          <div className="mt-12">
            <div className={`flex gap-2 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              <Input
                placeholder="输入兑换代码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-400 flex-1"
              />
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`bg-[#5235E8] hover:bg-[#4125D7] text-white ${isMobile ? 'w-full' : 'min-w-[100px]'}`}
              >
                {isLoading ? "提交中..." : "提交"}
              </Button>
            </div>
          </div>
          
          {/* 记录 */}
          <div className="absolute bottom-6 left-0 right-0 text-center text-zinc-500">
            无记录
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}