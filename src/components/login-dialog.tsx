'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { authService } from '@/services/authService'
import { useToast } from "@/components/ui/use-toast"

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps = { open: false, onOpenChange: () => { } }) {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async () => {
    // 表单验证
    if (!account || !password) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "请输入账号和密码",
      })
      return
    }

    if (!terms) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "请同意服务条款",
      })
      return
    }

    try {
      setLoading(true)
      
      // 1. 先登录获取 token
      const loginResponse = await authService.login({
        username: account,
        password: password
      })
      localStorage.setItem('token', loginResponse.token)

      // 2. 获取用户信息
      const userInfo = await authService.getUserInfo()
      
      // 3. 保存用户信息到本地存储
      localStorage.setItem('userInfo', JSON.stringify(userInfo))

      // 如果需要记住登录状态
      if (remember) {
        localStorage.setItem('rememberMe', 'true')
      }

      toast({
        title: "登录成功",
        description: `欢迎回来，${userInfo.username}`,
      })

      // 关闭登录弹窗
      onOpenChange(false)

      // 可以在这里添加登录成功后的跳转逻辑
      // router.push('/dashboard')

    } catch (error: any) {
      // 登录失败时清除 token
      authService.logout()
      
      toast({
        variant: "destructive",
        title: "登录失败",
        description: error.response?.data?.message || "请检查账号密码是否正确",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-[#1a1b26] text-white">
        {/* 添加 DialogTitle 并使用 sr-only 类使其仅对屏幕阅读器可见 */}
        <DialogTitle className="sr-only">登录对话框</DialogTitle>

        <div className="flex flex-col sm:flex-row h-full sm:h-[500px]">
          {/* 左侧Logo区域 - 在移动设备上隐藏 */}
          <div className="hidden sm:block w-full sm:w-2/5 relative bg-gradient-to-br from-black-900 to-black-700">
            <Image
              src="/images/login_logo.png"
              alt="GCSGO Logo"
              layout="fill"
              objectFit="contain"
              className="p-1"
            />
          </div>

          {/* 右侧登录表单 - 在移动设备上全屏显示 */}
          <div className="w-full sm:w-3/5 p-8 relative">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">关闭</span>
            </button>

            {/* 在移动设备上显示logo */}
            <div className="sm:hidden mb-6">
              <Image
                src="/images/login_logo.png"
                alt="GCSGO Logo"
                width={120}
                height={40}
              />
            </div>

            <h2 className="text-2xl font-bold mb-6">登录</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="账号"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="bg-[#2a2b36] border-none h-12"
                  disabled={loading}
                />
                <Input
                  type="password"
                  placeholder="密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#2a2b36] border-none h-12"
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-purple-600"
                    disabled={loading}
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400">
                    记住我
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-purple-400">
                  忘记密码?
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={terms}
                    onCheckedChange={(checked) => setTerms(checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-purple-600 mt-1"
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    通过访问本网站，我证明我至少年满18岁，并已阅读并同意
                    <Link href="/terms" className="text-purple-400 hover:text-purple-300 ml-1">
                      服务条款
                    </Link>
                  </label>
                </div>
                <Button
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "登录中..." : "登录"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}