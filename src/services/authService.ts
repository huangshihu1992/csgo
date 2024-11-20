import { api } from './api'

// 定义登录参数接口
interface LoginParams {
  username: string
  password: string
}

// 定义登录响应接口
interface LoginResponse {
  token: string
}

// 定义用户信息接口
interface UserInfo {
  id: string
  username: string
  // ... 其他用户信息字段
}

export const authService = {
  // 登录方法
  async login(params: LoginParams): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', params)
    
    // 保存 token 到 localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      // 设置 API 请求头的 Authorization
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    }

    return response.data
  },

  // 获取用户信息
  async getUserInfo(): Promise<UserInfo> {
    const response = await api.get<UserInfo>('/getInfo')
    return response.data
  },

  // 登出方法
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    delete api.defaults.headers.common['Authorization']
  },

  // 获取当前 token
  getToken(): string | null {
    return localStorage.getItem('token')
  },

  // 检查是否已登录
  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}